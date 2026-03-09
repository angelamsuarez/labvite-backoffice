"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function RegisterForm() {
  const router = useRouter()

  const [fields, setFields] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function setField(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    setFormError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
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

      if (data.confirmed) {
        // Auto-confirmed (e.g. admin-created accounts) — go straight to login
        router.push("/login?confirmed=1&email=" + encodeURIComponent(fields.email))
      } else {
        // Standard flow — user must enter the code Cognito emailed them
        router.push("/confirm?email=" + encodeURIComponent(fields.email))
      }
    } catch {
      setFormError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  if (successMessage) {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-medium text-green-800">Check your email</p>
        <p className="mt-1 text-sm text-green-700">{successMessage}</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-rose-600 font-medium hover:text-rose-700">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {formError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{formError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          value={fields.name}
          onChange={setField("name")}
          error={errors.name?.[0]}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={fields.email}
          onChange={setField("email")}
          error={errors.email?.[0]}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          autoComplete="new-password"
          value={fields.password}
          onChange={setField("password")}
          error={errors.password?.[0]}
          hint="At least 8 characters, one uppercase letter, and one number"
          required
        />

        <Button type="submit" size="lg" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-rose-600 font-medium hover:text-rose-700">
          Sign in
        </Link>
      </p>
    </div>
  )
}
