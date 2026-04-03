-- STRATA shop: categories + products
-- Run in Supabase SQL Editor (or: supabase db push if using CLI)

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  sort_order int not null default 0
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  price integer not null check (price >= 0),
  category_id uuid not null references public.categories (id) on delete restrict,
  collection text not null,
  description text not null,
  sizes jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  new_drop boolean not null default false,
  created_at timestamptz default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_slug_idx on public.products (slug);

alter table public.categories enable row level security;
alter table public.products enable row level security;

drop policy if exists "Allow public read categories" on public.categories;
create policy "Allow public read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow public read products" on public.products;
create policy "Allow public read products"
  on public.products for select
  to anon, authenticated
  using (true);

-- Seed categories
insert into public.categories (slug, label, sort_order) values
  ('hoodies', 'Hoodies', 1),
  ('tees', 'Tees', 2),
  ('pants', 'Pants', 3),
  ('accessories', 'Accessories', 4)
on conflict (slug) do nothing;

-- Seed products (id matches storefront / cart)
insert into public.products (id, slug, name, price, category_id, collection, description, sizes, images, featured, new_drop)
select
  v.id, v.slug, v.name, v.price, c.id, v.collection, v.description, v.sizes::jsonb, v.images::jsonb, v.featured, v.new_drop
from (values
  ('p1', 'void-oversized-hoodie', 'VOID Oversized Hoodie', 198, 'hoodies', 'SS26 — VOID', 'Heavyweight cotton fleece with dropped shoulders, tonal embroidery, and a relaxed silhouette. Cut and sewn in Portugal.', '["XS","S","M","L","XL"]'::text, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=85","https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=85"]'::text, true, true),
  ('p2', 'brutalist-hoodie', 'Brutalist Hoodie', 225, 'hoodies', 'SS26 — VOID', 'Black pullover fleece with ribbed cuffs, a structured hood, and debossed branding at the back neck. Matte drawcord tips.', '["S","M","L","XL"]'::text, '["https://i.pinimg.com/736x/40/25/f4/4025f4dbb66a5e6fd0450dc74314ded1.jpg","https://i.pinimg.com/736x/40/25/f4/4025f4dbb66a5e6fd0450dc74314ded1.jpg"]'::text, true, false),
  ('p3', 'archive-box-tee', 'Archive Box Tee', 78, 'tees', 'Core', 'Midweight jersey with a boxy fit and vintage wash. Screen-printed graphic at chest; subtle distressing at hem.', '["XS","S","M","L","XL","XXL"]'::text, '["https://i.pinimg.com/1200x/81/94/6c/81946c054538d6d24d99ea31af04f82d.jpg","https://i.pinimg.com/1200x/81/94/6c/81946c054538d6d24d99ea31af04f82d.jpg"]'::text, true, true),
  ('p4', 'monolith-longsleeve', 'Monolith Longsleeve', 95, 'tees', 'SS26 — VOID', 'Ribbed collar and cuffs, elongated sleeves, and a minimal tonal logo at the sleeve.', '["S","M","L","XL"]'::text, '["https://i.pinimg.com/1200x/59/f6/c0/59f6c05c63e586b045aed8aa0a064f11.jpg","https://i.pinimg.com/1200x/59/f6/c0/59f6c05c63e586b045aed8aa0a064f11.jpg"]'::text, false, true),
  ('p5', 'concrete-denim', 'Concrete Denim', 268, 'pants', 'SS26 — VOID', 'Rigid indigo denim with a slim taper, bar-tacked pockets, and a clean hem. Washed for a subtle vintage cast.', '["28","30","32","34","36"]'::text, '["https://i.pinimg.com/1200x/2c/5d/b0/2c5db05631aa38df06d753f4b18d57a1.jpg","https://i.pinimg.com/1200x/2c/5d/b0/2c5db05631aa38df06d753f4b18d57a1.jpg"]'::text, true, false),
  ('p6', 'wide-leg-trousers', 'Wide Leg Trousers', 242, 'pants', 'Core', 'Wool-blend suiting fabric with a fluid drape. Pressed crease, side adjusters, and hook-and-bar closure.', '["28","30","32","34"]'::text, '["https://i.pinimg.com/736x/7b/a6/ad/7ba6add9051c75e5fc4ebc644f439fba.jpg","https://i.pinimg.com/736x/7b/a6/ad/7ba6add9051c75e5fc4ebc644f439fba.jpg"]'::text, false, true),
  ('p7', 'industrial-crossbody', 'Industrial Crossbody', 156, 'accessories', 'Core', 'Ballistic nylon with magnetic Fidlock buckle, modular strap system, and interior card sleeve.', '["ONE SIZE"]'::text, '["https://i.pinimg.com/1200x/ad/17/03/ad1703aa762adf038015796d9cbfbdb4.jpg","https://i.pinimg.com/1200x/ad/17/03/ad1703aa762adf038015796d9cbfbdb4.jpg"]'::text, true, false),
  ('p8', 'cold-wall-cap', 'Cold Wall Cap', 68, 'accessories', 'SS26 — VOID', 'Structured six-panel cap in brushed cotton. Embroidered wordmark and tonal eyelets.', '["ONE SIZE"]'::text, '["https://i.pinimg.com/1200x/d6/7a/a2/d67aa2c9b79fc9bc9b1ddd0993a227de.jpg","https://i.pinimg.com/1200x/d6/7a/a2/d67aa2c9b79fc9bc9b1ddd0993a227de.jpg"]'::text, false, true),
  ('p9', 'essential-crewneck', 'Essential Crewneck', 165, 'tees', 'Core', 'Loopback cotton with a clean neckline and minimal branding at the hem. Layer-ready weight.', '["XS","S","M","L","XL"]'::text, '["https://i.pinimg.com/1200x/84/26/b5/8426b54dd30d8db060fd77dfd8cd6b34.jpg","https://i.pinimg.com/1200x/84/26/b5/8426b54dd30d8db060fd77dfd8cd6b34.jpg"]'::text, false, false),
  ('p10', 'graphic-tee-oxide', 'Graphic Tee — Oxide', 85, 'tees', 'SS26 — VOID', 'Limited run graphic inspired by industrial signage. Soft-hand print on garment-dyed cotton.', '["S","M","L","XL","XXL"]'::text, '["https://i.pinimg.com/1200x/56/89/6a/56896a718e68050d15f38673655b4ef0.jpg","https://i.pinimg.com/1200x/56/89/6a/56896a718e68050d15f38673655b4ef0.jpg"]'::text, false, true)
) as v(id, slug, name, price, cat_slug, collection, description, sizes, images, featured, new_drop)
join public.categories c on c.slug = v.cat_slug
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  category_id = excluded.category_id,
  collection = excluded.collection,
  description = excluded.description,
  sizes = excluded.sizes,
  images = excluded.images,
  featured = excluded.featured,
  new_drop = excluded.new_drop;
