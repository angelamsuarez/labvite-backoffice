import { Suspense } from "react"
import type { Metadata } from "next"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Sign in — Labvite",
}

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">Sign in to your Labvite account</p>
      </div>
      {/* Suspense required because LoginForm uses useSearchParams() */}
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  )
}
