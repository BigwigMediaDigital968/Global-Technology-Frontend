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
    <section className="bg-bg min-h-screen pt-24">
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

      {/* Tabs */}
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

// verified lead version

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import ProductGallery from "../../../components/website/Product/ProductGallery";
// import ProductInfo from "../../../components/website/Product/ProductInfo";
// import ProductSpecs from "../../../components/website/Product/ProductSpecs ";
// import ProductTabs from "../../../components/website/Product/ProductTabs";
// import RelatedProducts from "../../../components/website/Product/RelatedProducts";

// interface Product {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   images: string[];
//   extraDetails?: Record<string, string>;
//   faqs?: { question: string; answer: string }[];
//   collectionName: { _id: string; name: string };
//   status: "active" | "inactive";
// }

// export default function ProductDetailPage({ product }: { product: Product }) {
//   const router = useRouter();
//   const [authorized, setAuthorized] = useState(false);

//   /* -------- Lead Verification Check -------- */
//   useEffect(() => {
//     const verified = localStorage.getItem("lead_verified");

//     if (!verified) {
//       router.push(`/lead-login?redirect=/products/${product.slug}`);
//     } else {
//       setAuthorized(true);
//     }
//   }, [router, product.slug]);

//   /* -------- Prevent page render until verified -------- */
//   if (!authorized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-muted">
//         Checking access...
//       </div>
//     );
//   }

//   return (
//     <section className="bg-bg min-h-screen pt-24">
//       {/* Breadcrumb */}
//       <nav className="px-6 pt-6 pb-0 max-w-7xl mx-auto flex items-center gap-2 text-xs text-muted">
//         <span>Products</span>
//         <span className="opacity-40">›</span>
//         <span>{product.collectionName?.name}</span>
//         <span className="opacity-40">›</span>
//         <span className="text-text">{product.name}</span>
//       </nav>

//       {/* Hero: gallery + info */}
//       <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-2 gap-12">
//         <ProductGallery images={product.images} />
//         <ProductInfo product={product} />
//       </div>

//       {/* Specs strip */}
//       {product.extraDetails && (
//         <div className="mx-auto max-w-7xl px-6 pb-8">
//           <ProductSpecs extraDetails={product.extraDetails} />
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="mx-auto max-w-7xl px-6 pb-12">
//         <ProductTabs product={product} />
//       </div>

//       {/* Related */}
//       <RelatedProducts
//         title="Related Products"
//         subtitle="Compatible components from the same category"
//         collectionId={product.collectionName?._id}
//         excludeSlug={product.slug}
//       />
//     </section>
//   );
// }
