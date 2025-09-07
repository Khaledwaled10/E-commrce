import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { resetCode } = await req.json();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
