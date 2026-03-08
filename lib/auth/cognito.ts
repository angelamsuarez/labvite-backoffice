import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  GlobalSignOutCommand,
  type AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider"
import { createHmac } from "crypto"
import type { CognitoTokens } from "@/types/auth"

// ---------------------------------------------------------------------------
// Cognito client — Node.js runtime only (not Edge)
// ---------------------------------------------------------------------------
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION!,
})

const CLIENT_ID = process.env.COGNITO_CLIENT_ID!
const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET ?? ""

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Computes the SECRET_HASH required by Cognito when a client secret is set.
 * If no client secret is configured, returns undefined.
 */
function computeSecretHash(username: string): string | undefined {
  if (!CLIENT_SECRET) return undefined
  return createHmac("sha256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64")
}

function mapTokenResult(result: {
  IdToken?: string
  AccessToken?: string
  RefreshToken?: string
  ExpiresIn?: number
}): CognitoTokens {
  if (!result.IdToken || !result.AccessToken) {
    throw new Error("Cognito did not return expected tokens")
  }
  return {
    idToken: result.IdToken,
    accessToken: result.AccessToken,
    refreshToken: result.RefreshToken,
    expiresIn: result.ExpiresIn ?? 3600,
  }
}

// ---------------------------------------------------------------------------
// Auth operations
// ---------------------------------------------------------------------------

/**
 * Sign in with email and password (USER_PASSWORD_AUTH flow).
 * Requires the Cognito App Client to have ALLOW_USER_PASSWORD_AUTH enabled.
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<CognitoTokens> {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      ...(computeSecretHash(email) && { SECRET_HASH: computeSecretHash(email) }),
    },
  })

  const response = await cognitoClient.send(command)

  if (!response.AuthenticationResult) {
    throw new Error("Authentication failed — no result returned")
  }

  return mapTokenResult(response.AuthenticationResult)
}

/**
 * Register a new user in Cognito (email + password).
 * The user will receive a verification email from Cognito.
 */
export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<{ userSub: string; confirmed: boolean }> {
  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    ...(computeSecretHash(email) && { SecretHash: computeSecretHash(email) }),
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: name },
    ],
  })

  const response = await cognitoClient.send(command)

  return {
    userSub: response.UserSub ?? "",
    confirmed: response.UserConfirmed ?? false,
  }
}

/**
 * Refresh tokens using a valid refresh token.
 */
export async function refreshTokens(
  refreshToken: string,
  username: string
): Promise<CognitoTokens> {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN_AUTH" as AuthFlowType,
    ClientId: CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      ...(computeSecretHash(username) && { SECRET_HASH: computeSecretHash(username) }),
    },
  })

  const response = await cognitoClient.send(command)

  if (!response.AuthenticationResult) {
    throw new Error("Token refresh failed")
  }

  return {
    ...mapTokenResult(response.AuthenticationResult),
    refreshToken, // Cognito does not return a new refresh token unless rotation is enabled
  }
}

/**
 * Global sign out — invalidates all tokens for the user.
 */
export async function globalSignOut(accessToken: string): Promise<void> {
  const command = new GlobalSignOutCommand({ AccessToken: accessToken })
  await cognitoClient.send(command)
}

// ---------------------------------------------------------------------------
// Hosted UI (Google SSO)
// ---------------------------------------------------------------------------

/**
 * Builds the Cognito Hosted UI URL for Google SSO.
 * The user is redirected to this URL from /api/auth/google.
 */
export function buildGoogleAuthUrl(): string {
  const domain = process.env.COGNITO_DOMAIN!
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`

  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: callbackUrl,
    identity_provider: "Google",
    scope: "email openid profile",
  })

  return `https://${domain}/oauth2/authorize?${params.toString()}`
}

/**
 * Exchanges the authorization code (from Cognito callback) for tokens.
 * Called server-side from /api/auth/callback.
 */
export async function exchangeCodeForTokens(code: string): Promise<CognitoTokens> {
  const domain = process.env.COGNITO_DOMAIN!
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: callbackUrl,
    code,
  })

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  }

  // Include Basic auth header if client secret is set
  if (CLIENT_SECRET) {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
    headers["Authorization"] = `Basic ${credentials}`
  }

  const response = await fetch(`https://${domain}/oauth2/token`, {
    method: "POST",
    headers,
    body: body.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  const data = await response.json()

  return {
    idToken: data.id_token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in ?? 3600,
  }
}
