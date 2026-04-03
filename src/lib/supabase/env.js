/**
 * Supabase public URL + anon/publishable key (dashboard → API).
 * Supports legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` or newer publishable default key.
 */
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
}

export function getSupabaseAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    ""
  );
}
