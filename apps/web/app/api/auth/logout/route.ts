import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  response.cookies.set("access_token", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("refresh_token", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("user_name", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
