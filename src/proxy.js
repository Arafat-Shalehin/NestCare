import { NextResponse } from "next/server";

// proxy.js
export function proxy() {
  return NextResponse.next();
}
export const config = {
  matcher: ["/my-bookings", "/booking/:path*"],
};
