import { createRemoteJWKSet, jwtVerify, decodeJwt } from "jose"
import type { CognitoJwtPayload } from "@/types/auth"

// ---------------------------------------------------------------------------
// Cognito JWT verification — uses the public JWKS, works in Edge runtime
// ---------------------------------------------------------------------------

const JWKS_URL = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
const ISSUER = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`

// Cache the JWKS key set (jose handles internal caching)
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

function getJWKS() {
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(JWKS_URL))
  }
  return jwks
}

/**
 * Verifies a Cognito id_token or access_token.
 * Throws if invalid or expired.
 */
export async function verifyToken(token: string): Promise<CognitoJwtPayload> {
  const { payload } = await jwtVerify(token, getJWKS(), {
    issuer: ISSUER,
    // Cognito id_tokens have the client_id as audience
    // access_tokens don't have an "aud" claim — skip aud check here
  })

  return payload as unknown as CognitoJwtPayload
}

/**
 * Decodes a JWT without verifying the signature.
 * Use only when you already trust the token (e.g. from a secure httpOnly cookie
 * that was set after verification).
 */
export function decodeToken(token: string): CognitoJwtPayload {
  return decodeJwt(token) as unknown as CognitoJwtPayload
}

/**
 * Returns true if the token is expired (based on the `exp` claim).
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeToken(token)
    return Date.now() / 1000 > payload.exp
  } catch {
    return true
  }
}
