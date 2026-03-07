"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Get all products on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/admin/get`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data || res);
        setLoading(false);
      });
  }, []);

  // Status Change Handler
  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    const res = await fetch(
      `${API_BASE_URL}/api/products/admin/${id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const json = await res.json();

    if (json.success) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: newStatus } : p
        )
      );
    }
  }

  // Selection Handlers
  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function selectAll() {
    setSelected(products.map((p) => p._id));
  }

  function clearSelection() {
    setSelected([]);
  }

  // Delete Handler
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`${API_BASE_URL}/api/products/admin/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  // Bulk Delete Handler
  
  const filteredProducts = products.filter((p) => {
  const matchesSearch =
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.slug?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus = statusFilter
    ? p.status === statusFilter
    : true;

  return matchesSearch && matchesStatus;
});

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>

        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search by name or slug"
            className="border rounded-lg p-2 text-sm w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg p-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <Link
          href="/products-list/add"
          className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-5 py-2 rounded-lg text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>


      {selected.length > 0 && (
        <button
          onClick={() => handleDelete(selected[0])}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Delete Selected ({selected.length})
        </button>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#c5a37e]/20 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Collection</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
              <th className="p-3 text-left">
                <input type="checkbox" onChange={selectAll} />
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

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {filteredProducts?.map((product, index) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border-t hover:bg-gray-50"
              >
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    className="w-12 h-12 rounded object-cover border"
                    alt={product.name}
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-medium">{product.name}</td>

                {/* SLUG */}
                <td className="p-3 text-gray-600">
                  {product.slug || "-"}
                </td>

                {/* PRICE */}
                <td className="p-3 font-medium">
                  ₹{product.price}
                </td>

                {/* COLLECTION */}
                <td className="p-3 text-gray-600">
                  {product.collection?.name || "-"}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(product._id, product.status)}
                    className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {product.status}
                  </button>
                </td>

                {/* CREATED DATE */}
                <td className="p-3 text-gray-500 text-xs">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-4">
                  <Link
                    href={`/products-list/view/${product._id}`}
                    className="text-gray-700 hover:underline font-medium"
                  >
                    View
                  </Link>

                  <Link
                    href={`/products-list/edit/${product._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>

                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(product._id)}
                    onChange={() => toggleSelect(product._id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}