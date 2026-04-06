import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendOrderStatusEmail } from "@/lib/notifications/order-email";

const allowedStatuses = new Set([
  "placed",
  "in_transit",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

function isAuthorizedAdmin(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  const raw = process.env.ADMIN_EMAILS ?? "";
  const allowed = raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes(email.toLowerCase());
}

export async function POST(request: Request) {
  try {
    const userClient = await createServerSupabaseClient();
    const {
      data: { user },
    } = await userClient.auth.getUser();

    if (!user || !isAuthorizedAdmin(user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { orderId?: string; status?: string };
    const orderId = String(body.orderId ?? "").trim();
    const status = String(body.status ?? "").trim().toLowerCase();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const adminClient = createAdminSupabaseClient();

    if (!adminClient) {
      return NextResponse.json({ error: "Service role key is missing." }, { status: 500 });
    }

    const { error } = await adminClient
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: orderData } = await adminClient
      .from("orders")
      .select("id, user_id, customer_name, total_amount, status")
      .eq("id", orderId)
      .maybeSingle<{
        id: string;
        user_id: string | null;
        customer_name: string | null;
        total_amount: number | null;
        status: string | null;
      }>();

    let recipientEmail = "";
    if (orderData?.user_id) {
      const { data: userData } = await adminClient.auth.admin.getUserById(orderData.user_id);
      recipientEmail = userData.user?.email ?? "";
    }

    if (recipientEmail && orderData?.id && orderData.status) {
      await sendOrderStatusEmail({
        to: recipientEmail,
        customerName: orderData.customer_name ?? "Customer",
        orderId: orderData.id,
        status: orderData.status,
        totalAmount: Number(orderData.total_amount ?? 0),
      });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update order status.",
      },
      { status: 500 },
    );
  }
}
