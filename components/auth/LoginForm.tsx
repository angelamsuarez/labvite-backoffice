"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/dashboard"
  const urlError = searchParams.get("error")
  const confirmed = searchParams.get("confirmed") === "1"
  const confirmedEmail = searchParams.get("email") ?? ""

  const [email, setEmail] = useState(confirmedEmail)
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(urlError)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    setFormError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.issues) {
          setErrors(data.issues)
        } else {
          setFormError(data.error ?? "Something went wrong")
        }
        return
      }

      router.push(from)
      router.refresh()
    } catch {
      setFormError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Email confirmed banner */}
      {confirmed && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 flex items-center gap-2">
          <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-green-700">Email confirmed! Sign in to continue.</p>
        </div>
      )}

      {/* Form error banner */}
      {formError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{formError}</p>
        </div>
      )}

      {/* Email + password form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email?.[0]}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password?.[0]}
          required
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-rose-600 hover:text-rose-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        No account?{" "}
        <Link href="/register" className="text-rose-600 font-medium hover:text-rose-700">
          Create one
        </Link>
      </p>
    </div>
  )
}
