"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

interface Props {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: Props) {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever product list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("product-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading)
    return (
      <div className="py-20 text-center text-muted animate-pulse">
        Loading products...
      </div>
    );

  if (!products.length)
    return (
      <div className="py-20 text-center text-muted">No products found.</div>
    );

  return (
    <section id="product-grid" className="bg-bg py-16 md:py-20 scroll-mt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm border rounded transition cursor-pointer ${
                    currentPage === page
                      ? "bg-amber-200 text-black border-amber-200"
                      : "hover:bg-amber-100 border-border hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm border rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
