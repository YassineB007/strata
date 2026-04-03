/** Safe default when product JSON has missing or invalid image paths */
export const PRODUCT_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1400&q=85";

/**
 * Pin pages and short links resolve to HTML, not image bytes — they cannot be used as img src.
 * Use a direct file URL instead (e.g. https://i.pinimg.com/... from “Open image in new tab”).
 */
function isUnsupportedPageUrl(httpsUrl) {
  try {
    const u = new URL(httpsUrl);
    const host = u.hostname.toLowerCase();
    if (host === "pin.it" || host === "www.pin.it") return true;
    if (
      host === "pinterest.com" ||
      host === "www.pinterest.com" ||
      host.endsWith(".pinterest.com")
    ) {
      if (u.pathname.includes("/pin/")) return true;
    }
    return false;
  } catch {
    return true;
  }
}

/**
 * Returns a src valid for next/image: absolute http(s) URL or root-relative path.
 * Rejects bare filenames like "image.png" (must be "/image.png").
 * Rejects Pinterest/Instagram-style page URLs that are not direct image files.
 */
export function resolveImageSrc(src) {
  if (src == null || typeof src !== "string") return PRODUCT_IMAGE_PLACEHOLDER;
  const t = src.trim();
  if (!t) return PRODUCT_IMAGE_PLACEHOLDER;
  if (t.startsWith("/")) return t;
  if (!t.startsWith("http://") && !t.startsWith("https://")) {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }
  if (isUnsupportedPageUrl(t)) return PRODUCT_IMAGE_PLACEHOLDER;
  return t;
}

export function normalizeProductImages(images) {
  if (!Array.isArray(images) || images.length === 0) {
    return [PRODUCT_IMAGE_PLACEHOLDER];
  }
  return images.map(resolveImageSrc);
}

/** Dedupe while preserving order — for product galleries. */
export function uniqueImageUrls(urls) {
  const seen = new Set();
  const out = [];
  for (const u of urls) {
    if (!seen.has(u)) {
      seen.add(u);
      out.push(u);
    }
  }
  return out;
}
