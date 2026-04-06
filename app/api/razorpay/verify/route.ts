import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

interface VerifyPaymentBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  totalAmount: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  customer?: {
    full_name?: string;
    phone?: string;
    address?: string;
    email?: string;
  };
}

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as VerifyPaymentBody;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== body.razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    const adminClient = createAdminSupabaseClient();
    const userClient = await createServerSupabaseClient();
    const {
      data: { user },
    } = await userClient.auth.getUser();

    let createdOrder: { id: string; status: string } | null = null;

    if (adminClient) {
      const orderRecord = {
        user_id: user?.id ?? null,
        customer_name: body.customer?.full_name ?? "Customer",
        customer_phone: body.customer?.phone ?? "",
        customer_address: body.customer?.address ?? "",
        items: body.items,
        total_amount: Number(body.totalAmount ?? 0),
        status: "placed",
      };

      const { data, error } = await adminClient
        .from("orders")
        .insert(orderRecord)
        .select("id, status")
        .single();

      if (error) {
        return NextResponse.json(
          {
            error: `Payment captured but failed to save order: ${error.message}`,
          },
          { status: 500 },
        );
      }

      createdOrder = (data as { id: string; status: string } | null) ?? null;
    }

    return NextResponse.json({
      success: true,
      message: "Yay! Order placed successfully.",
      orderId: createdOrder?.id ?? null,
      status: createdOrder?.status ?? "placed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to verify Razorpay payment.",
      },
      { status: 500 },
    );
  }
}
