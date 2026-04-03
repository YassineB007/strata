import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrdersForUser } from "@/lib/ordersDb";

export const metadata = {
  title: "Account — STRATA",
  description: "Your STRATA account and orders.",
};

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const orders = await getOrdersForUser(user.id);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-8 py-12 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#0e0e12]/95">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.08] blur-[70px]" />
        <p className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase">
          Account
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)]">
          {user.email}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Orders are tied to this account. Complete checkout while signed in.
        </p>

        <div className="mt-12 border-t border-[var(--border)] pt-10">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--foreground)]">
            Order history
          </h2>
          {orders.length === 0 ? (
            <p className="mt-6 text-sm text-[var(--muted)]">
              No orders yet.{" "}
              <Link
                href="/shop"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                Shop the collection
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-8 space-y-4">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 px-5 py-4 transition-colors hover:border-accent/30 dark:bg-black/30"
                  >
                    <div>
                      <p className="font-mono-nums text-sm font-medium text-[var(--foreground)]">
                        {formatMoney(order.total)}
                      </p>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {order.status} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                      View →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/shop"
          className="mt-12 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[var(--muted)] uppercase transition-colors hover:text-accent"
        >
          Continue shopping
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
