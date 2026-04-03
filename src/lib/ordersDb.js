import "server-only";

import { prisma } from "@/lib/prisma";

export async function getOrdersForUser(userId) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export async function getOrderForUser(orderId, userId) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { items: true },
  });
}
