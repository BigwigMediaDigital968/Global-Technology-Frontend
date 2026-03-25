"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

interface Props {
  products: Product[];
  loading: boolean;
  filter: string;
}

export default function ProductGrid({ products, loading, filter }: Props) {
  const ITEMS_PER_PAGE = 12;

  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter logic
  const filtered =
    filter === "All"
      ? products
      : products.filter((p) => p.collectionName?.name === filter);

  // ✅ Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="py-20 text-center text-muted animate-pulse">
        Loading products...
      </div>
    );

  if (!filtered.length)
    return (
      <div className="py-20 text-center text-muted">No products found.</div>
    );

  return (
    <section id="product-grid" className="bg-bg py-16 md:py-20 scroll-mt-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* 🔥 PRODUCT GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* ✅ PAGINATION */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm border rounded transition ${
                    currentPage === page
                      ? "bg-amber-200 text-black border-amber-200 cursor-pointer"
                      : "hover:bg-amber-100 border-border hover:text-black cursor-pointer"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
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
