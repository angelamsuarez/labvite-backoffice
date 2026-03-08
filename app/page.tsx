import { redirect } from "next/navigation"

// Root → middleware will redirect to /login if unauthenticated,
// or pass through to /dashboard if authenticated.
export default function RootPage() {
  redirect("/dashboard")
}
