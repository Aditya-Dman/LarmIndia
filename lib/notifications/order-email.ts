type OrderEmailParams = {
  to: string;
  customerName?: string;
  orderId: string;
  status: string;
  totalAmount?: number;
};

function toStatusLabel(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildOrderStatusEmailHtml(params: OrderEmailParams) {
  const statusLabel = toStatusLabel(params.status);
  const shortOrderId = params.orderId.slice(0, 8).toUpperCase();
  const amountText =
    typeof params.totalAmount === "number" ? `₹${Number(params.totalAmount).toFixed(2)}` : "";

  return `
  <div style="font-family: Arial, sans-serif; background: #f8f4ec; padding: 24px; color: #1f2937;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #f59e0b33; border-radius: 14px; overflow: hidden;">
      <div style="background: linear-gradient(90deg, #b45309, #dc2626, #059669); color: #fff; padding: 14px 18px; font-weight: 700; letter-spacing: 0.03em;">
        Larm India - Order Update
      </div>
      <div style="padding: 22px 18px;">
        <p style="margin: 0 0 10px; font-size: 15px;">Hi ${params.customerName || "Customer"},</p>
        <p style="margin: 0 0 12px; font-size: 15px; line-height: 1.6;">
          Your order <strong>#${shortOrderId}</strong> has a new update.
        </p>
        <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 14px; background: #fff7ed; margin-bottom: 12px;">
          <p style="margin: 0; font-size: 13px; color: #92400e; text-transform: uppercase; letter-spacing: 0.08em;">Current Status</p>
          <p style="margin: 6px 0 0; font-size: 20px; font-weight: 700; color: #b45309;">${statusLabel}</p>
        </div>
        <p style="margin: 0 0 6px; font-size: 14px; color: #4b5563;"><strong>Order ID:</strong> ${params.orderId}</p>
        ${amountText ? `<p style="margin: 0 0 14px; font-size: 14px; color: #4b5563;"><strong>Total:</strong> ${amountText}</p>` : ""}
        <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
          You can track this order in your account under Recent Orders.
        </p>
      </div>
    </div>
  </div>`;
}

export async function sendOrderStatusEmail(params: OrderEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;

  if (!apiKey || !from || !params.to) {
    return { sent: false, reason: "Email config is missing." as const };
  }

  const subject = `Larm India Order #${params.orderId.slice(0, 8).toUpperCase()} - ${toStatusLabel(params.status)}`;
  const html = buildOrderStatusEmailHtml(params);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return { sent: false, reason: `Email API failed: ${body}` as const };
    }

    return { sent: true as const };
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "Failed to send email.",
    };
  }
}
