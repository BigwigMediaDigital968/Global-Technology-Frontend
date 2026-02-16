"use client";

import ProductGallery from "../../../components/website/Product/ProductGallery";
import ProductInfo from "../../../components/website/Product/ProductInfo";
import RelatedProducts from "../../../components/website/Product/RelatedProducts";

export default function ProductDetailPage() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16">
        <ProductGallery />
        <ProductInfo />
      </div>

      <RelatedProducts
        title="Related Products"
        subtitle="Compatible components from the same category"
      />
    </section>
  );
}
