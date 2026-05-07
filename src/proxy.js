import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const requestId = req.headers.get("x-request-id") || crypto.randomUUID();

    // Create response and set the request ID header for tracing
    const response = NextResponse.next();
    response.headers.set("x-request-id", requestId);

    return response;
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/users/:path*",
    "/admin/:path*",
    "/api/bookings/:path*",
    "/api/auth/register"
  ],
};
