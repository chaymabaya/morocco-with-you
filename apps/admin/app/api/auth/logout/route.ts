import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secure = process.env.NODE_ENV === "production";
  const response = NextResponse.redirect(new URL("/login", request.url));

  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("user_name", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
