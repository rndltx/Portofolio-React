import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_URL = 'https://www.api.rizsign.com/api'

export async function middleware(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://www.rizsign.com',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    try {
      const authCheck = await fetch(`${API_URL}/auth/check/index.php`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (!authCheck.ok) {
        console.error('Auth check failed:', await authCheck.text())
        return NextResponse.redirect(new URL('/login', request.url))
      }

      const data = await authCheck.json()
      if (!data.success) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

    } catch (error) {
      console.error('Auth check error:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}