import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    // Redirect to home if token is found and the user tries to visit sign-in or home (root)
    if (token && (url.pathname === '/sign-in' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
}

// Middleware configuration to apply it on specific routes
export const config = {
    matcher: ['/sign-in', '/']
}
