import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export async function POST(request: Request) {
  const body = await request.json();

  const upstream = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => ({}));

  if (!upstream.ok) {
    return NextResponse.json(
      { message: data?.message || "Email ou mot de passe incorrect" },
      { status: upstream.status }
    );
  }

  if (!data?.accessToken) {
    return NextResponse.json({ message: "Token manquant" }, { status: 502 });
  }

  const secure = process.env.NODE_ENV === "production";
  const displayName =
    typeof body?.name === "string" && body.name.trim().length > 0
      ? body.name.trim()
      : typeof body?.email === "string" && body.email.includes("@")
      ? body.email.split("@")[0]
      : "Mon compte";

  const response = NextResponse.json({ ok: true });

  response.cookies.set("access_token", data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  if (data?.refreshToken) {
    response.cookies.set("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  response.cookies.set("user_name", displayName, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
