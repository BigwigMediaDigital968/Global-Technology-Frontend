"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusItem, setStatusItem] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetch(`${API}/api/collections/admin`)
      .then((res) => res.json())
      .then((res) => {
        setCollections(res.data || res);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load collections");
        setLoading(false);
      });
  }, []);

  console.log(collections);

  /* =============================
     FILTER COLLECTIONS
  ============================== */

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCollections.length / limit);

  const paginatedCollections = filteredCollections.slice(
    (page - 1) * limit,
    page * limit,
  );

  /* =============================
     DELETE COLLECTION
  ============================== */

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      const res = await fetch(`${API}/api/collections/admin/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setCollections((prev) => prev.filter((c) => c._id !== deleteId));

      toast.success("Collection deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }

    setDeleteId(null);
  }

  /* =============================
     TOGGLE STATUS
  ============================== */

  async function confirmStatusChange() {
    if (!statusItem) return;

    try {
      const newStatus = statusItem.status === "active" ? "inactive" : "active";

      const res = await fetch(
        `${API}/api/collections/admin/${statusItem._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setCollections((prev) =>
        prev.map((c) =>
          c._id === statusItem._id ? { ...c, status: newStatus } : c,
        ),
      );

      toast.success(`Collection ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Status update failed");
    }

    setStatusItem(null);
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold">Collections</h2>

        <Link
          href="/collection-list/create"
          className="bg-[#c5a37e] px-4 py-2 rounded-lg font-medium text-black hover:bg-[#b59572] transition"
        >
          + Add Collection
        </Link>
      </div>

      {/* SEARCH BAR */}

      <div className="mb-4 relative max-w-sm">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border pl-10 pr-4 py-2 rounded-lg"
        />
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-[#c5a37e]/20">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t animate-pulse">
                    <td className="p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-200 w-32 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-200 w-10 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-6 bg-gray-200 w-20 rounded"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-200 w-20 rounded"></div>
                    </td>
                  </tr>
                ))
              : paginatedCollections?.map((c) => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">
                      <img
                        src={c.image}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </td>

                    <td className="p-3 font-medium">{c.name}</td>

                    <td className="p-3">{c.products?.length || 0}</td>

                    {/* STATUS */}

                    <td className="p-3">
                      <button
                        onClick={() => setStatusItem(c)}
                        className={`px-3 py-1 rounded text-sm cursor-pointer ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </button>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-3 flex gap-5 items-center pt-7">
                      <Link href={`/collection-list/view/${c._id}`}>
                        <Eye size={18} />
                      </Link>

                      <Link href={`/collection-list/edit/${c._id}`}>
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => setDeleteId(c._id)}
                        className="cursor-pointer"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-[#c5a37e] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* =============================
          DELETE MODAL
      ============================== */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h3 className="text-lg font-semibold mb-3 text-[#c5a37e]">
              Delete Collection
            </h3>

            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this collection?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border text-green-600 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =============================
          STATUS MODAL
      ============================== */}

      {statusItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            <h3 className="text-lg font-semibold mb-3 text-black">
              Change Status
            </h3>

            <p className="text-gray-600 mb-5 text-orange-500">
              Change collection status to{" "}
              <b>{statusItem.status === "active" ? "inactive" : "active"}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStatusItem(null)}
                className="px-4 py-2 border text-indigo-500 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-[#c5a37e] text-white rounded cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
