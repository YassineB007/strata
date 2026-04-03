"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] dark:bg-white/[0.03]">
        <Image
          src={main}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[var(--surface-2)] transition-all dark:bg-white/[0.04] ${
                active === i
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
