// export { auth as middleware } from "@/auth";

import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import { auth } from "./auth";

const publicRoutes = [
  "/signin",
  "/signup",
  "/products",
  "/api/auth/callback/google",
  "/cart",
];

// const { auth } = NextAuth(authConfig);

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  //   console.log("mid session", session?.user);
  //   console.log("from mid", nextUrl);
  //   console.log("url ", request.url);
  //   if (pathname === "/dashboard") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  const isPublicRoute =
    publicRoutes.find((route) => pathname.startsWith(route)) ||
    pathname === "/";

  const isAuthenticated = !!session?.user;
  const loginUrl = new URL("/signin", request.url);
  loginUrl.searchParams.set("callbackUrl", request.url);

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)", "/api/trpc/(.*)"],
};
