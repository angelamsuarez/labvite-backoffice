import { NextResponse } from "next/server"
import { z } from "zod"
import { resendConfirmationCode } from "@/lib/auth/cognito"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    await resendConfirmationCode(parsed.data.email)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("[auth/confirm/resend]", error)

    const name = (error as { name?: string }).name
    if (name === "LimitExceededException") {
      return NextResponse.json(
        { error: "Too many attempts. Please wait a few minutes before trying again." },
        { status: 429 }
      )
    }

    const message = error instanceof Error ? error.message : "Failed to resend code"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
