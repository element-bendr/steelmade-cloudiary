import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addHttp2ServerPush } from "./middleware/http2-push";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle redirects for collections and products paths
  if (pathname.startsWith('/collections/')) {
    // Create a new URL object using the current URL
    const url = new URL(request.url);
    // Update the pathname
    url.pathname = pathname.replace('/collections/', '/');
    return NextResponse.redirect(url, { status: 301 });
  }
  
  if (pathname.startsWith('/products/')) {
    // Create a new URL object using the current URL
    const url = new URL(request.url);
    // Update the pathname
    url.pathname = pathname.replace('/products/', '/');
    return NextResponse.redirect(url, { status: 301 });
  }
  // Only apply auth logic to /admin routes
  if (!pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    // Apply HTTP/2 Server Push for non-admin routes
    return addHttp2ServerPush(request, response);
  }
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic realm=Admin Access",
        "Content-Type": "application/json",
      },
    });
  }

  // Using TextEncoder/TextDecoder instead of Buffer for Edge Runtime compatibility
  const base64Credentials = authHeader.split(" ")[1];
  // Decode base64 string without using Buffer (Edge Runtime compatible)
  const credentials = atob(base64Credentials);
  const [username, password] = credentials.split(":");

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic realm=Admin Access",
        "Content-Type": "application/json",
      },
    });
  }
  // If authorized, continue
  const response = NextResponse.next();
  
  // Apply HTTP/2 Server Push optimization on HTML responses
  return addHttp2ServerPush(request, response);
}

export const config = {
  matcher: ["/admin/:path*", "/collections/:path*", "/products/:path*"],
};
