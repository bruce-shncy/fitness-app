import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy allows you to run code 
 */
export const proxy = (request: NextRequest) => {
    return NextResponse.redirect(new URL('/admin/auth/login', request.url))
}


export const config = {
    matcher: [
          // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ]
}