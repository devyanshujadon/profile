import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(req) {
  const hostname = req.headers.get('host')
  const subdomain = hostname.split('.')[0]

  // Route requests based on subdomains
  if (subdomain === 'projects') {
    return NextResponse.rewrite(`/projects/${req.nextUrl.pathname}`)
  }

  if (subdomain === 'app') {
    return NextResponse.rewrite(`/app/${req.nextUrl.pathname}`)
  }

  // Default behavior for the primary domain
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}