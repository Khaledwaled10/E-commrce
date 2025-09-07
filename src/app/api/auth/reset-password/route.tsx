import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { email, newPassword } = await req.json();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
