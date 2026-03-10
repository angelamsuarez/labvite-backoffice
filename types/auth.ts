// ---------------------------------------------------------------------------
// Auth domain types
// ---------------------------------------------------------------------------

export interface SessionUser {
  cognitoId: string
  email: string
  name?: string | null
  picture?: string | null
  role: string
}

export interface CognitoTokens {
  idToken: string
  accessToken: string
  refreshToken?: string
  expiresIn: number
}

export interface CognitoJwtPayload {
  sub: string
  email: string
  name?: string
  picture?: string
  "cognito:username": string
  token_use: "id" | "access"
  iss: string
  aud: string
  exp: number
  iat: number
  identities?: Array<{
    userId: string
    providerName: string
    providerType: string
    primary: string
  }>
}

export type AuthProvider = "cognito" | "google"
