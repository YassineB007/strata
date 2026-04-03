import {
  normalizeProductImages,
  uniqueImageUrls,
} from "@/lib/imageUrls";
import ProductAddToCart from "./ProductAddToCart";
import ProductGallery from "./ProductGallery";

export default function ProductDetail({ product }) {
  const galleryImages = uniqueImageUrls(normalizeProductImages(product.images));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:gap-x-16 xl:gap-x-24">
        <ProductGallery images={galleryImages} productName={product.name} />
        <ProductAddToCart product={product} />
      </div>
    </div>
  );
}
