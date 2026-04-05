import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface ProfileRow {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

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

export default async function AdminDashboardPage() {
  const userClient = await createServerSupabaseClient();
  const {
    data: { user },
  } = await userClient.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  if (!isAuthorizedAdmin(user.email)) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>
                Your account is logged in, but this email is not in ADMIN_EMAILS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Current user: {user.email ?? "unknown"}</p>
              <p>Set ADMIN_EMAILS in your environment as comma-separated values.</p>
              <p>
                Example: <span className="font-mono">ADMIN_EMAILS=owner@example.com,team@example.com</span>
              </p>
              <Link href="/" className="text-primary hover:underline">
                Back to website
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const adminClient = createAdminSupabaseClient();

  if (!adminClient) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Missing Service Role Key</CardTitle>
              <CardDescription>
                SUPABASE_SERVICE_ROLE_KEY is required to load all profiles and orders in admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Add SUPABASE_SERVICE_ROLE_KEY in local env and Vercel env settings.</p>
              <p>Keep this key server-only and never expose it with NEXT_PUBLIC_ prefix.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const [{ data: profiles, error: profilesError }, { data: orders, error: ordersError }] = await Promise.all([
    adminClient
      .from("profiles")
      .select("id, full_name, phone, address, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(200),
    adminClient.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
  ]);

  const profileRows = (profiles ?? []) as ProfileRow[];
  const orderRows = (orders ?? []) as Array<Record<string, unknown>>;
  const orderColumns = orderRows.length > 0 ? Object.keys(orderRows[0]) : [];

  return (
    <main className="min-h-screen bg-background px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Orders and customer profiles from Supabase</p>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to website
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total Profiles</CardTitle>
              <CardDescription>Customer records from profiles table</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profileRows.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription>Records currently available in orders table</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orderRows.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profiles</CardTitle>
            <CardDescription>Latest customers and delivery details</CardDescription>
          </CardHeader>
          <CardContent>
            {profilesError ? (
              <p className="text-sm text-red-600">Could not load profiles: {profilesError.message}</p>
            ) : profileRows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No profiles found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium">Name</th>
                      <th className="px-3 py-2 font-medium">Phone</th>
                      <th className="px-3 py-2 font-medium">Address</th>
                      <th className="px-3 py-2 font-medium">Created</th>
                      <th className="px-3 py-2 font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileRows.map((profile) => (
                      <tr key={profile.id} className="border-t">
                        <td className="px-3 py-2 font-medium">{profile.full_name}</td>
                        <td className="px-3 py-2">{profile.phone}</td>
                        <td className="px-3 py-2 max-w-[420px] whitespace-normal">{profile.address}</td>
                        <td className="px-3 py-2">{new Date(profile.created_at).toLocaleString()}</td>
                        <td className="px-3 py-2">{new Date(profile.updated_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>All order rows from Supabase orders table</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersError ? (
              <div className="space-y-2 text-sm">
                <p className="text-red-600">Could not load orders: {ordersError.message}</p>
                <p className="text-muted-foreground">
                  If this table does not exist yet, create orders table in Supabase and this section will start showing data.
                </p>
              </div>
            ) : orderRows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      {orderColumns.map((column) => (
                        <th key={column} className="px-3 py-2 font-medium capitalize">
                          {column.replaceAll("_", " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orderRows.map((row, idx) => (
                      <tr key={String(row.id ?? idx)} className="border-t">
                        {orderColumns.map((column) => (
                          <td key={`${String(row.id ?? idx)}-${column}`} className="px-3 py-2 align-top">
                            {typeof row[column] === "object"
                              ? JSON.stringify(row[column])
                              : String(row[column] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
