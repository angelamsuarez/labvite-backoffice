"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Button from "@/components/ui/Button"

interface ConfirmFormProps {
  email: string
}

export default function ConfirmForm({ email }: ConfirmFormProps) {
  const router = useRouter()

  // 6 individual digit inputs for a clean UX
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)

  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null))

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Cooldown timer for resend button
  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  function handleDigitChange(index: number, value: string) {
    // Allow pasting a full 6-digit code into the first input
    if (value.length === 6 && index === 0) {
      const pasted = value.replace(/\D/g, "").slice(0, 6).split("")
      if (pasted.length === 6) {
        setDigits(pasted)
        inputRefs.current[5]?.focus()
        return
      }
    }

    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = digits.join("")
    if (code.length !== 6) {
      setError("Please enter the full 6-digit code")
      return
    }

    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong")
        // Clear digits on wrong code
        if (res.status === 400) {
          setDigits(Array(6).fill(""))
          inputRefs.current[0]?.focus()
        }
        return
      }

      // Confirmed — redirect to login with success message
      router.push(`/login?confirmed=1&email=${encodeURIComponent(email)}`)
    } catch {
      setError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResendMessage(null)
    setResendLoading(true)

    try {
      const res = await fetch("/api/auth/confirm/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Could not resend the code")
        return
      }

      setResendMessage("A new code was sent to your email.")
      setCooldown(60) // Prevent spamming — 60 s cooldown
    } catch {
      setError("Network error — please try again")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Instruction */}
      <p className="text-sm text-gray-500">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-gray-900">{email}</span>.
        Enter it below to verify your account.
      </p>

      {/* 6-digit OTP inputs */}
      <div className="flex justify-between gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={6} // allow paste on first input
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={[
              "h-14 w-full rounded-xl border text-center text-xl font-semibold",
              "focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent",
              "transition-colors",
              error
                ? "border-red-400 bg-red-50 text-red-700"
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-400",
            ].join(" ")}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Resend success */}
      {resendMessage && (
        <p className="text-sm text-green-700 text-center">{resendMessage}</p>
      )}

      <Button type="submit" size="lg" fullWidth loading={loading}>
        Verify account
      </Button>

      {/* Resend */}
      <p className="text-center text-sm text-gray-500">
        Didn&apos;t receive it?{" "}
        {cooldown > 0 ? (
          <span className="text-gray-400">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-rose-600 font-medium hover:text-rose-700 disabled:opacity-50"
          >
            {resendLoading ? "Sending…" : "Resend code"}
          </button>
        )}
      </p>

      <p className="text-center text-sm text-gray-500">
        Wrong email?{" "}
        <Link href="/register" className="text-rose-600 font-medium hover:text-rose-700">
          Go back
        </Link>
      </p>
    </form>
  )
}
