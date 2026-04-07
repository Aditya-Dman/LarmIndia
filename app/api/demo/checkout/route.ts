import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendOrderStatusEmail } from "@/lib/notifications/order-email";

interface DemoCheckoutBody {
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
    const adminClient = createAdminSupabaseClient();

    if (!adminClient) {
      return NextResponse.json(
        { error: "Server configuration missing for demo checkout." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as DemoCheckoutBody;

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Cart items are required." }, { status: 400 });
    }

    const userClient = await createServerSupabaseClient();
    const {
      data: { user },
    } = await userClient.auth.getUser();

    const { data: createdOrder, error } = await adminClient
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        customer_name: body.customer?.full_name ?? "Customer",
        customer_phone: body.customer?.phone ?? "",
        customer_address: body.customer?.address ?? "",
        items: body.items,
        total_amount: Number(body.totalAmount ?? 0),
        status: "placed",
      })
      .select("id, status")
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Demo order creation failed: ${error.message}` },
        { status: 500 },
      );
    }

    const recipientEmail = user?.email ?? body.customer?.email ?? "";
    if (recipientEmail) {
      await sendOrderStatusEmail({
        to: recipientEmail,
        customerName: body.customer?.full_name ?? "Customer",
        orderId: createdOrder.id,
        status: createdOrder.status,
        totalAmount: Number(body.totalAmount ?? 0),
      });
    }

    return NextResponse.json({
      success: true,
      orderId: createdOrder.id,
      status: createdOrder.status,
      message: "Demo Razorpay checkout completed.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Demo checkout failed.",
      },
      { status: 500 },
    );
  }
}
