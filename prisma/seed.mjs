import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "hoodies", label: "Hoodies", sortOrder: 1 },
  { slug: "tees", label: "Tees", sortOrder: 2 },
  { slug: "pants", label: "Pants", sortOrder: 3 },
  { slug: "accessories", label: "Accessories", sortOrder: 4 },
];

async function main() {
  const raw = readFileSync(join(__dirname, "seed-data.json"), "utf8");
  /** @type {Array<{ id: string, slug: string, name: string, price: number, category: string, collection: string, description: string, sizes: string[], images: string[], featured: boolean, newDrop: boolean }>} */
  const products = JSON.parse(raw);

  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: { slug: c.slug, label: c.label, sortOrder: c.sortOrder },
      update: { label: c.label, sortOrder: c.sortOrder },
    });
  }

  const cats = await prisma.category.findMany();
  const bySlug = Object.fromEntries(cats.map((x) => [x.slug, x.id]));

  for (const p of products) {
    const categoryId = bySlug[p.category];
    if (!categoryId) {
      throw new Error(`Unknown category slug "${p.category}" for product ${p.id}`);
    }

    await prisma.product.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        categoryId,
        collection: p.collection,
        description: p.description,
        sizes: p.sizes,
        images: p.images,
        featured: p.featured,
        newDrop: p.newDrop,
      },
      update: {
        slug: p.slug,
        name: p.name,
        price: p.price,
        categoryId,
        collection: p.collection,
        description: p.description,
        sizes: p.sizes,
        images: p.images,
        featured: p.featured,
        newDrop: p.newDrop,
      },
    });
  }

  console.log(
    `Seed OK: ${CATEGORIES.length} categories, ${products.length} products.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
