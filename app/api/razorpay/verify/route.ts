import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json(
    {
      error: "Real Razorpay verification has been disabled. Use demo checkout flow.",
    },
    { status: 410 },
  );
}
