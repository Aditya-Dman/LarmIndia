"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type AdminOrderRow = {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  status: string | null;
  total_amount: number | null;
  created_at: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }> | null;
};

const statusOptions = [
  "placed",
  "in_transit",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

function toLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function AdminOrdersManager({ initialOrders }: { initialOrders: AdminOrderRow[] }) {
  const [orders, setOrders] = useState<AdminOrderRow[]>(initialOrders);
  const [draftStatus, setDraftStatus] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    initialOrders.forEach((order) => {
      initial[order.id] = String(order.status ?? "placed").toLowerCase();
    });
    return initial;
  });
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [orders],
  );

  const updateStatus = async (orderId: string) => {
    const nextStatus = draftStatus[orderId] ?? "placed";
    setSavingOrderId(orderId);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/orders/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });

      const data = (await res.json()) as { error?: string; status?: string };

      if (!res.ok) {
        setMessage(data.error ?? "Could not update order status.");
        setSavingOrderId(null);
        return;
      }

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status: data.status ?? nextStatus } : order)),
      );
      setMessage(`Updated order ${orderId.slice(0, 8).toUpperCase()} to ${toLabel(data.status ?? nextStatus)}.`);
      setSavingOrderId(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update order status.");
      setSavingOrderId(null);
    }
  };

  if (sortedOrders.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders found.</p>;
  }

  return (
    <div className="space-y-4">
      {message && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="px-3 py-2 font-medium">Customer</th>
              <th className="px-3 py-2 font-medium">Phone</th>
              <th className="px-3 py-2 font-medium">Amount</th>
              <th className="px-3 py-2 font-medium">Items</th>
              <th className="px-3 py-2 font-medium">Placed</th>
              <th className="px-3 py-2 font-medium">Tracking Status</th>
              <th className="px-3 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => {
              const currentStatus = draftStatus[order.id] ?? String(order.status ?? "placed").toLowerCase();

              return (
                <tr key={order.id} className="border-t">
                  <td className="px-3 py-2 font-semibold">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-3 py-2">{order.customer_name ?? "Customer"}</td>
                  <td className="px-3 py-2">{order.customer_phone ?? "-"}</td>
                  <td className="px-3 py-2">₹{Number(order.total_amount ?? 0).toFixed(2)}</td>
                  <td className="px-3 py-2">{(order.items ?? []).length}</td>
                  <td className="px-3 py-2">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <select
                      className="h-9 min-w-[180px] rounded-md border border-border bg-background px-2"
                      value={currentStatus}
                      onChange={(e) =>
                        setDraftStatus((prev) => ({
                          ...prev,
                          [order.id]: e.target.value,
                        }))
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {toLabel(status)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <Button
                      size="sm"
                      onClick={() => void updateStatus(order.id)}
                      disabled={savingOrderId === order.id}
                    >
                      {savingOrderId === order.id ? "Saving..." : "Update"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
