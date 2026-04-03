"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

function firstImageUrl(images) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const u = images[0];
  return typeof u === "string" ? u : null;
}

/**
 * @param {{ productId: string, size: string, quantity: number }[]} lineInputs
 * @param {{
 *   name: string,
 *   line1: string,
 *   line2: string,
 *   city: string,
 *   state: string,
 *   postal: string,
 *   country: string,
 * }} shipping
 */
export async function createOrder(lineInputs, shipping) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "You must be signed in to place an order." };
  }

  if (!lineInputs?.length) {
    return { ok: false, error: "Your cart is empty." };
  }

  const ids = [...new Set(lineInputs.map((l) => l.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
  });

  const byId = Object.fromEntries(products.map((p) => [p.id, p]));
  let total = 0;
  const lines = [];

  for (const line of lineInputs) {
    const p = byId[line.productId];
    if (!p) {
      return { ok: false, error: "One or more products are no longer available." };
    }
    if (line.quantity < 1 || line.quantity > 99) {
      return { ok: false, error: "Invalid quantity." };
    }
    const sub = p.price * line.quantity;
    total += sub;
    lines.push({
      productId: p.id,
      productName: p.name,
      unitPrice: p.price,
      size: line.size,
      quantity: line.quantity,
      imageUrl: firstImageUrl(p.images),
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      status: "PENDING",
      shippingName: shipping.name.trim(),
      shippingLine1: shipping.line1.trim(),
      shippingLine2: shipping.line2?.trim() || null,
      shippingCity: shipping.city.trim(),
      shippingState: shipping.state.trim(),
      shippingPostal: shipping.postal.trim(),
      shippingCountry: shipping.country.trim(),
      items: { create: lines },
    },
  });

  revalidatePath("/account");
  revalidatePath(`/account/orders/${order.id}`);

  return { ok: true, orderId: order.id };
}
