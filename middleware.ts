import { NextRequest, NextResponse } from 'next/server';

const BLOG_HOSTS = new Set(['blog.devyanshu.com', 'blog.localhost:3000']);

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();
  if (!BLOG_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  const stripped = url.pathname === '/' ? '' : url.pathname;
  url.pathname = `/journal${stripped}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!_next/|api/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$).*)',
  ],
};
