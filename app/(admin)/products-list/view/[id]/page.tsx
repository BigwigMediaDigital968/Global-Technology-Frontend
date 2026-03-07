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
      <div className="p-6 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Product Details
        </h2>

        <button
          onClick={() => router.push("/products-list")}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Products
        </button>
      </div>

      {/* BASIC INFO */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <span className="text-gray-500 text-sm">Name</span>
          <p className="font-medium">{product.name}</p>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Slug</span>
          <p>{product.slug || "-"}</p>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Price</span>
          <p className="font-medium">₹{product.price}</p>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Status</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              product.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.status}
          </span>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Collection</span>
          <p>{product.collection?.name || "-"}</p>
        </div>
      </div>

      {/* IMAGES */}
      {product.images?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Images</h3>
          <div className="flex gap-4 flex-wrap">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 rounded border object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* SIZES */}
      {product.sizes?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Sizes</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 border rounded text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* EXTRA DETAILS */}
      {product.extraDetails && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Extra Details</h3>
          <div className="space-y-2">
            {Object.entries(product.extraDetails).map(
              ([key, value]: any) => (
                <div key={key} className="flex gap-2 text-sm">
                  <span className="font-medium">{key}:</span>
                  <span>{value}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* FAQS */}
      {product.faqs?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">FAQs</h3>
          <div className="space-y-4">
            {product.faqs.map((faq: any, i: number) => (
              <div key={i}>
                <p className="font-medium">{faq.question}</p>
                <p className="text-sm text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}