import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://www.rizsign.com',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', 'https://www.rizsign.com')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  
  return response
}