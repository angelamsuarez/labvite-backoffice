import { NextResponse } from "next/server"
import { z } from "zod"
import { registerUser } from "@/lib/auth/cognito"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data
    const result = await registerUser(email, password, name)

    return NextResponse.json({
      success: true,
      confirmed: result.confirmed,
      // If not confirmed, the user must verify their email
      message: result.confirmed
        ? "Account created successfully"
        : "Account created — please check your email to verify your account",
    })
  } catch (error: unknown) {
    console.error("[auth/register]", error)

    const cognitoError = (error as { name?: string }).name
    if (cognitoError === "UsernameExistsException") {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }
    if (cognitoError === "InvalidPasswordException") {
      return NextResponse.json(
        { error: "Password does not meet security requirements" },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : "Registration failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
