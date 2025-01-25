
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';

    const token = request.cookies.get("token")?.value || ''
    if (isPublicPath && token) {
        console.log("patha nahi")
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        console.log("login")
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
    ],
}
