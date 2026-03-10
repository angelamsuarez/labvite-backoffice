import { redirect } from "next/navigation"
import type { Metadata } from "next"
import ConfirmForm from "@/components/auth/ConfirmForm"

export const metadata: Metadata = {
  title: "Verify your email — Labvite",
}

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function ConfirmPage({ searchParams }: Props) {
  const { email } = await searchParams

  // If no email in URL, someone navigated here directly — send to register
  if (!email) {
    redirect("/register")
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Check your email</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the confirmation code we just sent you
        </p>
      </div>
      <ConfirmForm email={email} />
    </>
  )
}
