import { NextResponse } from "next/server"
import { z } from "zod"
import { confirmSignUp } from "@/lib/auth/cognito"

const confirmSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6, "Enter the 6-digit code").max(6, "Code must be 6 digits"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = confirmSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await confirmSignUp(parsed.data.email, parsed.data.code)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("[auth/confirm]", error)

    const name = (error as { name?: string }).name
    if (name === "CodeMismatchException") {
      return NextResponse.json({ error: "That code is incorrect. Please try again." }, { status: 400 })
    }
    if (name === "ExpiredCodeException") {
      return NextResponse.json(
        { error: "That code has expired. Request a new one." },
        { status: 400 }
      )
    }
    if (name === "NotAuthorizedException") {
      return NextResponse.json({ error: "This account is already confirmed." }, { status: 400 })
    }

    const message = error instanceof Error ? error.message : "Confirmation failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
