import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/cart", "/wishlist", "/checkout", "/allorders"];
  const authRoutes = ["/api/auth/signin", "/api/auth/signup"];

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/wishlist",
    "/checkout",
    "/allorders",
    "/api/auth/signin",
    "/api/auth/signup",
  ],
};