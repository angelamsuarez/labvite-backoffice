import { NextResponse } from "next/server"
import { buildGoogleAuthUrl } from "@/lib/auth/cognito"

// ---------------------------------------------------------------------------
// Initiates the Google SSO flow by redirecting to Cognito Hosted UI
// ---------------------------------------------------------------------------
export async function GET() {
  const url = buildGoogleAuthUrl()
  return NextResponse.redirect(url)
}
