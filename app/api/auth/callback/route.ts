import { NextResponse } from "next/server"
import { exchangeCodeForTokens } from "@/lib/auth/cognito"
import { setSessionCookies } from "@/lib/auth/session"
import { syncUserFromToken } from "@/lib/auth/user-sync"

// ---------------------------------------------------------------------------
// OAuth 2.0 callback — Cognito Hosted UI redirects here after Google login
// ---------------------------------------------------------------------------
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("[auth/callback] OAuth error:", error, searchParams.get("error_description"))
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent("Google sign-in was cancelled")}`, request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=Missing+authorization+code", request.url)
    )
  }

  try {
    const tokens = await exchangeCodeForTokens(code)

    // Sync user to MongoDB
    await syncUserFromToken(tokens.idToken)

    const response = NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
    return setSessionCookies(response, tokens)
  } catch (error) {
    console.error("[auth/callback] Token exchange failed:", error)
    return NextResponse.redirect(
      new URL("/login?error=Authentication+failed", request.url)
    )
  }
}
