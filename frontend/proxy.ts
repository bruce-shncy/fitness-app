import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy executes before routes are rendered. It's particularly useful for implementing custom
 * server-side logic like authentication, logging, or handling redirects.
 *
 * This function receives the incoming request before Next.js decides which page to show.
 */
export const proxy = (request: NextRequest) => {
    console.log("proxy hit:", request.nextUrl.pathname);
    const { pathname } = request.nextUrl;

    // TODO: replace with a real cookie-based token:
    const token = request.cookies.get("fitness_app_token")?.value ?? null;

    // 1) Protect /admin routes
    if (pathname.startsWith("/admin")) {
        // Not logged in → send to login
        if (!token) {
            return NextResponse.redirect(
                new URL("/auth/admin/login", request.url)
            );
        }

        // Logged in → let Next.js decide (render page or 404 if route doesn’t exist)
        return NextResponse.next();
    }

    // 2) Handle root "/"
    if (pathname === "/") {
        if (!token) {
            // No token on "/" → send to login
            return NextResponse.redirect(
                new URL("/auth/admin/login", request.url)
            );
        }

        // Logged in on "/" → send to your admin default
        return NextResponse.redirect(
            new URL("/admin/organizations", request.url)
        );
    }

    // 3) Everything else → let Next.js handle it (including 404 for unknown routes)
    return NextResponse.next();
};

/**
 * Proxy will only run for:
 * - "/"
 * - any "/admin/*" route
 */
export const config = {
    matcher: ["/", "/admin/:path*"],
};
