import { NextRequest, NextResponse } from 'next/server'

export {default} from 'next-auth/middleware'
 import {getToken} from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If no token and trying to access a protected page → redirect to sign-in
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  if (token && (
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify')
  )) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
