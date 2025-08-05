import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the origin header from the request
  const origin = request.headers.get('origin') || ''

  // Define allowed origins including localhost and Vercel deployment URL
  const allowedOrigins = [
    'http://localhost:3000',
    'https://vahan-chatbot.vercel.app/'
  ]

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, {
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Handle actual requests
  const response = NextResponse.next()

  // Add CORS headers to all responses
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

// Configure which paths should be handled by the middleware
export const config = {
  matcher: [
    '/api/chat',
    '/api/feedback'
  ]
}
