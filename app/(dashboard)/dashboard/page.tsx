import type { Metadata } from "next"
import { getSessionUser } from "@/lib/auth/session"

export const metadata: Metadata = {
  title: "Dashboard — Labvite",
}

export default async function DashboardPage() {
  const user = await getSessionUser()

  return (
    <div className="px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Good to see you, {user?.name?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Placeholder stats — replace with real data later */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Invitations", value: "—" },
          { label: "Published", value: "—" },
          { label: "RSVPs received", value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 bg-white px-6 py-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder content area */}
      <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">
        <p className="text-gray-400 text-sm">
          Invitation builder and other features will appear here.
        </p>
      </div>
    </div>
  )
}
