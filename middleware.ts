import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth/tokens"
import { SESSION_COOKIE } from "@/lib/auth/session"

// ---------------------------------------------------------------------------
// Route configuration
// ---------------------------------------------------------------------------
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/confirm",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/confirm",
  "/api/auth/google",
  "/api/auth/callback",
  "/api/auth/refresh",
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
}

// ---------------------------------------------------------------------------
// Middleware — runs on every matched request (Edge runtime)
// ---------------------------------------------------------------------------
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Static assets and Next internals — skip
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const idToken = request.cookies.get(SESSION_COOKIE)?.value

  // ── Authenticated user hitting auth pages → redirect to dashboard ──────────
  if (isPublicPath(pathname) && idToken) {
    try {
      await verifyToken(idToken)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch {
      // Token invalid — let them through to the auth page
    }
  }

  // ── Protected route without a token → redirect to login ───────────────────
  if (!isPublicPath(pathname) && pathname !== "/") {
    if (!idToken) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      await verifyToken(idToken)
    } catch {
      // Token is expired or invalid — clear it and redirect to login
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete(SESSION_COOKIE)
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
