import { NextResponse } from "next/server"
import { globalSignOut } from "@/lib/auth/cognito"
import { clearSessionCookies, ACCESS_COOKIE } from "@/lib/auth/session"
import { cookies } from "next/headers"

// ---------------------------------------------------------------------------
// Logout — invalidates the Cognito session and clears all session cookies
// ---------------------------------------------------------------------------
export async function POST() {
  try {
    const store = await cookies()
    const accessToken = store.get(ACCESS_COOKIE)?.value

    if (accessToken) {
      // Best-effort: invalidate the Cognito session globally
      await globalSignOut(accessToken).catch((err) =>
        console.warn("[auth/logout] Global sign-out warning:", err)
      )
    }
  } catch (error) {
    console.warn("[auth/logout] Could not retrieve access token:", error)
  }

  const response = NextResponse.json({ success: true })
  return clearSessionCookies(response)
}
