import Image from "next/image";
import Link from "next/link";
import {
  normalizeProductImages,
  uniqueImageUrls,
} from "@/lib/imageUrls";

export default function ProductCard({ product, index = 0 }) {
  const images = uniqueImageUrls(normalizeProductImages(product.images));
  const primary = images[0];
  const secondary = images[1];
  const hasAltView = Boolean(secondary && secondary !== primary);

  return (
    <article
      className="product-card-enter group"
      style={{ "--stagger": index }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/40 shadow-[0_2px_0_rgba(255,255,255,0.04)_inset] transition-[border-color,box-shadow,transform] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-accent/25 group-hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25),0_0_0_1px_rgba(212,255,76,0.12)] dark:bg-white/[0.02] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] dark:group-hover:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.65),0_0_0_1px_rgba(212,255,76,0.15)]">
          <div className="relative aspect-[3/4] overflow-hidden">
            {!hasAltView ? (
              <Image
                src={primary}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                priority={index < 3}
              />
            ) : (
              <>
                <Image
                  src={primary}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-100 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0"
                  priority={index < 3}
                />
                <Image
                  src={secondary}
                  alt={`${product.name} — alternate view`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
              </>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {product.newDrop && (
              <span className="absolute left-4 top-4 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                New
              </span>
            )}
            <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="rounded-full bg-accent px-4 py-2 text-[9px] font-bold tracking-[0.2em] text-[#0a0a0a] uppercase shadow-lg shadow-accent/20">
                View
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4 px-0.5">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[var(--foreground)] transition-colors group-hover:text-accent">
              {product.name}
            </h3>
            <p className="mt-1.5 text-[10px] font-medium tracking-[0.2em] text-[var(--muted)] uppercase">
              {product.collection}
            </p>
          </div>
          <p className="font-mono-nums shrink-0 text-sm font-medium text-[var(--foreground)]">
            ${product.price}
          </p>
        </div>
      </Link>
    </article>
  );
}
