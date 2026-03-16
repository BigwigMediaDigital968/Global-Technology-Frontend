"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function ViewProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/admin/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.data || res);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">Product not found</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6 space-y-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[rgb(var(--gt-text))]">
          Product Details
        </h2>

        <button
          onClick={() => router.push("/products-list")}
          className="text-sm text-[rgb(var(--gt-accent))] hover:opacity-80 cursor-pointer"
        >
          ← Back to Products
        </button>
      </div>

      {/* BASIC INFO */}
      <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6 space-y-4">
        <div>
          <span className="text-sm text-[rgb(var(--gt-muted))]">Name</span>
          <p className="font-medium">{product.name}</p>
        </div>

        <div>
          <span className="text-sm text-[rgb(var(--gt-muted))]">Slug</span>
          <p>{product.slug || "-"}</p>
        </div>

        <div>
          <span className="text-sm text-[rgb(var(--gt-muted))]">
            Collection
          </span>
          <p>{product.collectionName?.name || "-"}</p>
        </div>

        <div>
          <span className="text-sm text-[rgb(var(--gt-muted))]">Status</span>

          <span
            className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
              product.status === "active"
                ? "bg-green-500/10 text-green-400 border border-green-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}
          >
            {product.status}
          </span>
        </div>
      </div>

      {/* SHORT DESCRIPTION */}
      {product.shortDescription && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-3">Short Description</h3>

          <p className="text-sm text-[rgb(var(--gt-muted))] leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      )}

      {/* LONG DESCRIPTION */}
      {product.longDescription && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-3">Long Description</h3>

          <p className="text-sm text-[rgb(var(--gt-muted))] leading-relaxed whitespace-pre-line">
            {product.longDescription}
          </p>
        </div>
      )}

      {/* IMAGES */}
      {product.images?.length > 0 && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-4">Images</h3>

          <div className="flex gap-4 flex-wrap">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-28 h-28 rounded-lg border border-[rgb(var(--gt-border))] object-cover hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT FILE */}
      {product.file && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-3">Product File</h3>

          <div className="flex gap-3">
            {/* View */}
            <a
              href={`${product.file}#toolbar=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[rgb(var(--gt-primary))] text-white text-sm"
            >
              View Catalogue
            </a>

            {/* Download */}
            <a
              href={`${product.file}?fl_attachment`}
              className="px-4 py-2 rounded-lg border border-[rgb(var(--gt-border))] text-sm"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      {/* EXTRA DETAILS */}
      {product.extraDetails && Object.keys(product.extraDetails).length > 0 && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-3">Extra Details</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(product.extraDetails).map(([key, value]: any) => (
              <div
                key={key}
                className="flex gap-10 border-b border-[rgb(var(--gt-border))] pb-1 text-sm"
              >
                <span className="text-[rgb(var(--gt-muted))]">{key}:</span>

                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQS */}
      {product.faqs?.length > 0 && (
        <div className="bg-[rgb(var(--gt-card))] border border-[rgb(var(--gt-border))] rounded-xl p-6">
          <h3 className="font-semibold mb-4">FAQs</h3>

          <div className="space-y-4">
            {product.faqs.map((faq: any, i: number) => (
              <div
                key={i}
                className="border border-[rgb(var(--gt-border))] rounded-lg p-4"
              >
                <p className="font-medium text-[rgb(var(--gt-accent))]">
                  Question: {faq.question}
                </p>

                <p className="text-sm text-[rgb(var(--gt-muted))] mt-1">
                  Answer: {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
