import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { decodeToken } from "./tokens"
import type { CognitoTokens, SessionUser } from "@/types/auth"

// ---------------------------------------------------------------------------
// Cookie configuration
// ---------------------------------------------------------------------------
const IS_PROD = process.env.NODE_ENV === "production"

const COOKIE_DEFAULTS = {
  httpOnly: true,
  secure: IS_PROD,
  sameSite: "lax" as const,
  path: "/",
}

export const SESSION_COOKIE = "lv_id_token"
export const ACCESS_COOKIE = "lv_access_token"
export const REFRESH_COOKIE = "lv_refresh_token"

// ---------------------------------------------------------------------------
// Set session cookies on a NextResponse
// ---------------------------------------------------------------------------
export function setSessionCookies(
  response: NextResponse,
  tokens: CognitoTokens
): NextResponse {
  const maxAge = tokens.expiresIn // ~3600 for id/access tokens

  response.cookies.set(SESSION_COOKIE, tokens.idToken, {
    ...COOKIE_DEFAULTS,
    maxAge,
  })

  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    ...COOKIE_DEFAULTS,
    maxAge,
  })

  if (tokens.refreshToken) {
    response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
      ...COOKIE_DEFAULTS,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    })
  }

  return response
}

// ---------------------------------------------------------------------------
// Clear session cookies
// ---------------------------------------------------------------------------
export function clearSessionCookies(response: NextResponse): NextResponse {
  response.cookies.delete(SESSION_COOKIE)
  response.cookies.delete(ACCESS_COOKIE)
  response.cookies.delete(REFRESH_COOKIE)
  return response
}

// ---------------------------------------------------------------------------
// Read session from server components / server actions
// ---------------------------------------------------------------------------

/**
 * Returns the raw id_token string from the session cookie, or null.
 * For use in Server Components and Route Handlers.
 */
export async function getIdToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value ?? null
}

/**
 * Returns the decoded session user from the id_token cookie, or null.
 * Does NOT re-verify the signature — call verifyToken() if you need that.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const idToken = await getIdToken()
  if (!idToken) return null

  try {
    const payload = decodeToken(idToken)
    return {
      cognitoId: payload.sub,
      email: payload.email,
      name: payload.name ?? null,
      picture: payload.picture ?? null,
      role: "USER", // enriched from DB in server components if needed
    }
  } catch {
    return null
  }
}

/**
 * Returns the refresh token from the cookie, or null.
 */
export async function getRefreshToken(): Promise<string | null> {
  const store = await cookies()
  return store.get(REFRESH_COOKIE)?.value ?? null
}
