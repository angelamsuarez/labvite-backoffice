import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in — Labvite",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="text-2xl">💌</span>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">Labvite</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">Back Office</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
        {children}
      </div>

      <p className="mt-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Labvite. All rights reserved.
      </p>
    </div>
  )
}
