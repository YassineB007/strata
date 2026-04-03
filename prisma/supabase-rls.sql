-- Run once in Supabase SQL Editor after `prisma db push` if tables were created without RLS.
-- Safe to re-run (drops/recreates policies).

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
