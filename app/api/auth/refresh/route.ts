import { NextResponse } from "next/server"
import { refreshTokens } from "@/lib/auth/cognito"
import { setSessionCookies, clearSessionCookies, getRefreshToken, getSessionUser } from "@/lib/auth/session"

// ---------------------------------------------------------------------------
// Refreshes the id/access tokens using the stored refresh token
// ---------------------------------------------------------------------------
export async function POST() {
  const refreshToken = await getRefreshToken()
  const user = await getSessionUser()

  if (!refreshToken || !user) {
    return NextResponse.json({ error: "No active session" }, { status: 401 })
  }

  try {
    const tokens = await refreshTokens(refreshToken, user.email)

    const response = NextResponse.json({ success: true })
    return setSessionCookies(response, tokens)
  } catch (error) {
    console.error("[auth/refresh] Failed to refresh tokens:", error)
    // Clear stale cookies
    const response = NextResponse.json({ error: "Session expired" }, { status: 401 })
    return clearSessionCookies(response)
  }
}
