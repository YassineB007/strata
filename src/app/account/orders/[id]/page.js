import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrderForUser } from "@/lib/ordersDb";
import { resolveImageSrc } from "@/lib/imageUrls";

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order — STRATA`,
    description: `Order ${id.slice(0, 8)}…`,
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/account/orders/${id}`);
  }

  const order = await getOrderForUser(id, user.id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/account"
          className="text-[10px] font-bold tracking-[0.25em] text-[var(--muted)] uppercase transition-colors hover:text-accent"
        >
          ← Back to account
        </Link>

        <div className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] px-8 py-10 dark:border-white/[0.08] dark:bg-[#0e0e12]/95">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold tracking-[0.35em] text-accent uppercase">
                Order
              </p>
              <h1 className="mt-2 font-mono-nums text-sm text-[var(--muted)]">
                {order.id}
              </h1>
            </div>
            <div className="text-right">
              <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--foreground)]">
                {formatMoney(order.total)}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {order.status} ·{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-[var(--border)] pt-10">
            <h2 className="text-[10px] font-bold tracking-[0.25em] text-[var(--muted)] uppercase">
              Ship to
            </h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-[var(--foreground)]">
              {order.shippingName}
              <br />
              {order.shippingLine1}
              {order.shippingLine2 && (
                <>
                  <br />
                  {order.shippingLine2}
                </>
              )}
              <br />
              {order.shippingCity}, {order.shippingState} {order.shippingPostal}
              <br />
              {order.shippingCountry}
            </address>
          </div>

          <div className="mt-10 border-t border-[var(--border)] pt-10">
            <h2 className="text-[10px] font-bold tracking-[0.25em] text-[var(--muted)] uppercase">
              Items
            </h2>
            <ul className="mt-6 space-y-8">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-[var(--border)] pb-8 last:border-0 last:pb-0"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
                    {item.imageUrl ? (
                      <Image
                        src={resolveImageSrc(item.imageUrl)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-[var(--muted)]">
                        —
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--foreground)]">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Size {item.size} × {item.quantity}
                    </p>
                    <p className="mt-2 font-mono-nums text-sm text-[var(--foreground)]">
                      {formatMoney(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
