// "use client";

// import ProductGallery from "../../../components/website/Product/ProductGallery";
// import ProductInfo from "../../../components/website/Product/ProductInfo";
// import RelatedProducts from "../../../components/website/Product/RelatedProducts";

// export default function ProductDetailPage() {
//   return (
//     <section className="bg-bg">
//       <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16">
//         <ProductGallery />
//         <ProductInfo />
//       </div>

//       <RelatedProducts
//         title="Related Products"
//         subtitle="Compatible components from the same category"
//       />
//     </section>
//   );
// }

"use client";

import ProductGallery from "../../../components/website/Product/ProductGallery";
import ProductInfo from "../../../components/website/Product/ProductInfo";
import ProductSpecs from "../../../components/website/Product/ProductSpecs ";
import ProductTabs from "../../../components/website/Product/ProductTabs";
import RelatedProducts from "../../../components/website/Product/RelatedProducts";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images: string[];
  extraDetails?: Record<string, string>;
  faqs?: { question: string; answer: string }[];
  collectionName: { _id: string; name: string };
  status: "active" | "inactive";
}

export default function ProductDetailPage({ product }: { product: Product }) {
  return (
    <section className="bg-bg min-h-screen">
      {/* Breadcrumb */}
      <nav className="px-6 pt-6 pb-0 max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted">
        <span>Products</span>
        <span className="opacity-40">›</span>
        <span>{product.collectionName?.name}</span>
        <span className="opacity-40">›</span>
        <span className="text-text">{product.name}</span>
      </nav>

      {/* Hero: gallery + info */}
      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-2 gap-12">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      {/* Specs strip */}
      {product.extraDetails && (
        <div className="mx-auto max-w-7xl px-6 pb-8">
          <ProductSpecs extraDetails={product.extraDetails} />
        </div>
      )}

      {/* Tabs: description, extra details, FAQs */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <ProductTabs product={product} />
      </div>

      {/* Related */}
      <RelatedProducts
        title="Related Products"
        subtitle="Compatible components from the same category"
        collectionId={product.collectionName?._id}
        excludeSlug={product.slug}
      />
    </section>
  );
}
