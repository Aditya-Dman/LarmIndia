import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Real Razorpay checkout has been disabled. Use demo checkout flow.",
    },
    { status: 410 },
  );
}
