import { prisma } from "@/lib/db/prisma"
import { decodeToken } from "./tokens"
import type { AuthProvider } from "@/types/auth"

// ---------------------------------------------------------------------------
// Syncs (upserts) a Cognito user into MongoDB after a successful auth event.
// ---------------------------------------------------------------------------
export async function syncUserFromToken(idToken: string): Promise<void> {
  try {
    const payload = decodeToken(idToken)

    const provider: AuthProvider = payload.identities?.[0]?.providerName === "Google"
      ? "google"
      : "cognito"

    await prisma.user.upsert({
      where: { cognitoId: payload.sub },
      create: {
        cognitoId: payload.sub,
        email: payload.email,
        name: payload.name ?? null,
        picture: payload.picture ?? null,
        provider,
      },
      update: {
        email: payload.email,
        name: payload.name ?? null,
        picture: payload.picture ?? null,
      },
    })
  } catch (error) {
    console.error("[syncUserFromToken] Failed to sync user to DB:", error)
    // In development, throw so the error is visible immediately
    if (process.env.NODE_ENV === "development") throw error
    // In production, don't block the auth flow — the user still gets a valid session
  }
}
