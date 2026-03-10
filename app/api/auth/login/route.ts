import { NextResponse } from "next/server"
import { z } from "zod"
import { signInWithPassword } from "@/lib/auth/cognito"
import { setSessionCookies } from "@/lib/auth/session"
import { syncUserFromToken } from "@/lib/auth/user-sync"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const tokens = await signInWithPassword(email, password)

    // Sync user to MongoDB (non-blocking on error)
    await syncUserFromToken(tokens.idToken)

    const response = NextResponse.json({ success: true })
    return setSessionCookies(response, tokens)
  } catch (error: unknown) {
    console.error("[auth/login]", error)

    const message =
      error instanceof Error ? error.message : "Authentication failed"

    // Map Cognito error names to user-friendly messages
    const cognitoError = (error as { name?: string }).name
    if (cognitoError === "NotAuthorizedException") {
      return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 })
    }
    if (cognitoError === "UserNotConfirmedException") {
      return NextResponse.json(
        { error: "Please verify your email before signing in" },
        { status: 401 }
      )
    }
    if (cognitoError === "UserNotFoundException") {
      return NextResponse.json({ error: "No account found with that email" }, { status: 401 })
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
