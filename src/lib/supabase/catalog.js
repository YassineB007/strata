import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Read-only catalog access without cookies — safe for `generateStaticParams` and static pages.
 * (The SSR client in `server.js` uses `cookies()` and must not run at build time.)
 */
export function createCatalogClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;
  return createClient(url, key);
}
