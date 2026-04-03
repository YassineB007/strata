import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getAllProducts, getProductBySlug } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product — STRATA" };
  }
  return {
    title: `${product.name} — STRATA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
