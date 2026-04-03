import { Suspense } from "react";
import ShopContent from "./ShopContent";
import ShopSkeleton from "./ShopSkeleton";
import { getAllProducts, getCategoryFilters } from "@/lib/products";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategoryFilters(),
  ]);

  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent products={products} categories={categories} />
    </Suspense>
  );
}
