import "server-only";

import { createCatalogClient } from "@/lib/supabase/catalog";

/** @typedef {{ id: string, label: string }} CategoryFilter */

/** Shop filter chips when DB is unavailable: only “All”. */
const MINIMAL_CATEGORY_FILTERS = [{ id: "all", label: "All" }];

function mapProductRow(row) {
  const rel = row.categories;
  const categorySlug =
    rel == null
      ? ""
      : Array.isArray(rel)
        ? rel[0]?.slug
        : rel.slug;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    category: categorySlug,
    collection: row.collection,
    description: row.description,
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    images: Array.isArray(row.images) ? row.images : [],
    featured: Boolean(row.featured),
    newDrop: Boolean(row.new_drop),
  };
}

function getCatalog() {
  return createCatalogClient();
}

const PRODUCT_LIST_SELECT =
  "id, slug, name, price, collection, description, sizes, images, featured, new_drop, categories ( slug )";

/**
 * Category chips for shop filters — includes "All" plus DB categories ordered by sort_order.
 * @returns {Promise<CategoryFilter[]>}
 */
export async function getCategoryFilters() {
  const supabase = getCatalog();
  if (!supabase) {
    return MINIMAL_CATEGORY_FILTERS;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("slug, label")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[products] getCategoryFilters", error.message);
    return MINIMAL_CATEGORY_FILTERS;
  }

  const rows = data ?? [];
  return [
    { id: "all", label: "All" },
    ...rows.map((c) => ({ id: c.slug, label: c.label })),
  ];
}

export async function getAllProducts() {
  const supabase = getCatalog();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_LIST_SELECT)
    .order("id", { ascending: true });

  if (error) {
    console.error("[products] getAllProducts", error.message);
    return [];
  }

  return (data ?? []).map(mapProductRow);
}

/**
 * @param {string} slug
 */
export async function getProductBySlug(slug) {
  const supabase = getCatalog();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_LIST_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[products] getProductBySlug", error.message);
    return null;
  }

  if (!data) return null;
  return mapProductRow(data);
}

export async function getFeaturedProducts() {
  const supabase = getCatalog();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_LIST_SELECT)
    .eq("featured", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("[products] getFeaturedProducts", error.message);
    return [];
  }

  return (data ?? []).map(mapProductRow);
}

export async function getNewDrops() {
  const supabase = getCatalog();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_LIST_SELECT)
    .eq("new_drop", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("[products] getNewDrops", error.message);
    return [];
  }

  return (data ?? []).map(mapProductRow);
}
