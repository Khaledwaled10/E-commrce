import { NextResponse } from "next/server";
import getTokenAuth from "@/utilites/getTokenAuth";

export async function GET() {
  try {
    const token = await getTokenAuth();
   
    if (!token) {
      return NextResponse.json({ message: "Unauthorized, login first" }, { status: 401 });
    }

    const verify = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      method: "GET",
      headers: { token },
    });

    const verifiedData = await verify.json();
   

    const userId: string = verifiedData.decoded.id;

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      { headers: { token }}
    );

    const orders = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: "Failed to fetch orders", error: orders }, { status: res.status });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
