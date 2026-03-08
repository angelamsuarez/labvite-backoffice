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
  const [googleLoading, setGoogleLoading] = useState(false)

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
        router.push("/login?success=Account+created")
      } else {
        setSuccessMessage(data.message)
      }
    } catch {
      setFormError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  function handleGoogleSignIn() {
    setGoogleLoading(true)
    window.location.href = "/api/auth/google"
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
      {/* Google SSO */}
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        loading={googleLoading}
        onClick={handleGoogleSignIn}
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
