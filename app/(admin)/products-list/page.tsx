"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;
// Paste at top of any file that renders categories
function resolveCategories(raw: any): { _id: string; name: string }[] {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : [raw];
  return arr.filter(Boolean).map((c) =>
    typeof c === "string"
      ? { _id: c, name: "—" } // unpopulated fallback
      : { _id: c._id, name: c.name },
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [confirmModal, setConfirmModal] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/admin`)
      .then((r) => r.json())
      .then((r) => {
        if (r.success) setProducts(r.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Collect unique category names across all products for filter dropdown
  const allCategories = Array.from(
    new Map(
      products
        .flatMap((p) => (Array.isArray(p.category) ? p.category : [p.category]))
        .filter(Boolean)
        .map((c: any) => [c._id, c]),
    ).values(),
  );

  /* ── Status toggle ── */
  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setConfirmModal({
      title: "Change Product Status",
      message: `Mark this product as ${newStatus}?`,
      action: async () => {
        setActionLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/products/admin/${id}/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          },
        );
        const json = await res.json();
        if (json.success) {
          setProducts((prev) =>
            prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p)),
          );
        }
        setActionLoading(false);
        setConfirmModal(null);
      },
    });
  }

  /* ── Delete ── */
  function confirmDelete(id: string) {
    setConfirmModal({
      title: "Delete Product",
      message: "This cannot be undone. Delete this product?",
      action: async () => {
        setActionLoading(true);
        await fetch(`${API_BASE_URL}/api/products/admin/${id}`, {
          method: "DELETE",
        });
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setActionLoading(false);
        setConfirmModal(null);
      },
    });
  }

  /* ── Bulk delete ── */
  function confirmBulkDelete() {
    setConfirmModal({
      title: "Delete Selected",
      message: `Delete ${selected.length} products?`,
      action: async () => {
        setActionLoading(true);
        for (const id of selected) {
          await fetch(`${API_BASE_URL}/api/products/admin/${id}`, {
            method: "DELETE",
          });
        }
        setProducts((prev) => prev.filter((p) => !selected.includes(p._id)));
        setSelected([]);
        setActionLoading(false);
        setConfirmModal(null);
      },
    });
  }

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const selectAll = () =>
    setSelected(
      selected.length === products.length ? [] : products.map((p) => p._id),
    );

  /* ── Filter ── */
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? p.status === statusFilter : true;

    const matchesCategory = categoryFilter
      ? Array.isArray(p.category)
        ? p.category.some((c: any) => c._id === categoryFilter)
        : p.category?._id === categoryFilter
      : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Products</h2>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <input
            placeholder="Search product..."
            className="border border-gray-600 bg-transparent text-white placeholder-gray-400 rounded-lg p-2 text-sm w-52 focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status filter */}
          <select
            className="border border-gray-600 bg-transparent text-white rounded-lg p-2 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option className="text-black" value="">
              All Status
            </option>
            <option className="text-black" value="active">
              Active
            </option>
            <option className="text-black" value="inactive">
              Inactive
            </option>
          </select>

          {/* Category filter */}
          <select
            className="border border-gray-600 bg-transparent text-white rounded-lg p-2 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option className="text-black" value="">
              All Categories
            </option>
            {allCategories.map((cat: any) => (
              <option className="text-black" key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/products-list/add"
          className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          + Add Product
        </Link>
      </div>

      {/* BULK ACTIONS */}
      {selected.length > 0 && (
        <div className="mb-4 flex gap-3">
          <button
            onClick={confirmBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Delete Selected ({selected.length})
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-transparent rounded-xl shadow overflow-x-auto border">
        <table className="min-w-full text-sm">
          <thead className="bg-[#c5a37e]/20">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Collection</th>
              <th className="p-3 text-left">Categories</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={
                    selected.length === products.length && products.length > 0
                  }
                  className="cursor-pointer"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            )}

            {!loading && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {filteredProducts.map((product, index) => {
              const cats: any[] = Array.isArray(product.category)
                ? product.category.filter(Boolean)
                : product.category
                  ? [product.category]
                  : [];

              return (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t hover:bg-gray-800"
                >
                  <td className="p-3">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      className="w-12 h-12 rounded object-cover border"
                      alt={product.name}
                    />
                  </td>

                  <td className="p-3 font-medium">{product.name}</td>

                  <td className="p-3 text-gray-400">
                    {product.collectionName?.name || "—"}
                  </td>

                  {/* CATEGORIES */}
                  <td className="p-3">
                    {(() => {
                      const cats = resolveCategories(product.category);
                      if (!cats.length)
                        return (
                          <span className="text-xs text-gray-400">
                            No categories
                          </span>
                        );
                      return (
                        <div className="flex flex-wrap gap-1">
                          {cats.slice(0, 2).map((cat) => (
                            <span
                              key={cat._id}
                              className="text-xs bg-[#c5a37e]/10 text-[#c5a37e] border border-[#c5a37e]/20 px-2 py-0.5 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))}
                          {cats.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{cats.length - 2}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(product._id, product.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </button>
                  </td>

                  <td className="p-3 text-xs">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/products-list/view/${product._id}`}
                      className="hover:underline border p-2 rounded-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/products-list/edit/${product._id}`}
                      className="text-blue-600 border border-blue-600 p-2 hover:underline font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(product._id)}
                      className="text-red-600 border p-2 hover:underline font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(product._id)}
                      onChange={() => toggleSelect(product._id)}
                      className="cursor-pointer"
                    />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {confirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl shadow-lg w-[400px] p-6"
            >
              <h3 className="text-lg font-bold text-[#b59572] mb-2">
                {confirmModal.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {confirmModal.message}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.action}
                  disabled={actionLoading}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  {actionLoading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
