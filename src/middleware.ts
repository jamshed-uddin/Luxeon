// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const customerPrivateRoutes = ["/profile", "/profile/addresses", "/checkout"];

const adminRoutes = [
  "/dashboard",
  "/dashboard/products",
  "/dashboard/add-product",
  "/dashboard/orders",
];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const isCustomerRoute = customerPrivateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";
  const isAuthenticated = !!session?.user;
  const loginUrl = new URL("/signin", request.url);
  loginUrl.searchParams.set("callbackUrl", request.url);

  // if it's  customer protected route and not authenticated
  if (!isAuthenticated && (isCustomerRoute || isAdminRoute)) {
    return NextResponse.redirect(loginUrl);
  }

  //when a authenticated customer tries to access admin route

  if (isAuthenticated && !isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if authenticated and trying to access login or signup

  if (isAuthenticated && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // when admin tries to access customer routes
  // todo: omit the exclamation mark
  if (!isAdmin && isCustomerRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)", "/api/trpc/(.*)"],
};
