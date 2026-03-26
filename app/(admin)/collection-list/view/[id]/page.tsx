"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Tag } from "lucide-react";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_BASE_URI;

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

export default function CollectionView() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/collections/admin/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setCollection(r.data || r);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load collection");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-3xl">
        <div className="h-8 bg-gray-200 w-48 rounded" />
        <div className="h-64 bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 w-60 rounded" />
      </div>
    );
  }

  if (!collection) return null;

  const categories: { _id: string; name: string }[] =
    collection.categories || [];
  const products: any[] = collection.products || [];

  return (
    <div className="max-w-4xl space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 hover:text-[#c5a37e] cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <Link
          href={`/collection-list/edit/${collection._id}`}
          className="flex items-center gap-2 bg-[#c5a37e] text-white px-4 py-2 rounded-lg"
        >
          <Pencil size={16} /> Edit Collection
        </Link>
      </div>

      {/* MAIN CARD */}
      <div className="bg-transparent rounded-xl shadow p-6 space-y-6">
        {/* IMAGE + META */}
        <div className="flex gap-6 items-start">
          <img
            src={collection.image}
            className="w-40 h-40 rounded-lg object-cover border shrink-0"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-[#c5a37e]">
              {collection.name}
            </h1>
            <p className="text-gray-500 text-sm">Slug: {collection.slug}</p>
            <span
              className={`inline-block px-3 py-1 rounded text-sm ${
                collection.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {collection.status}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h3 className="text-lg text-[#c5a37e] font-semibold mb-2">
            Description
          </h3>
          <p className="text-gray-600">
            {collection.description || "No description available"}
          </p>
        </div>

        {/* ── CATEGORIES ── */}
        {/* CATEGORIES */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag size={18} className="text-[#c5a37e]" />
            <h3 className="text-lg text-[#c5a37e] font-semibold">
              Categories
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({resolveCategories(collection.categories).length})
              </span>
            </h3>
          </div>

          {resolveCategories(collection.categories).length === 0 ? (
            <p className="text-gray-400 text-sm">
              No categories assigned to this collection.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {resolveCategories(collection.categories).map((cat) => (
                <span
                  key={cat._id}
                  className="bg-[#c5a37e]/10 text-[#c5a37e] border border-[#c5a37e]/30 px-3 py-1 rounded-full text-sm"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-lg text-[#c5a37e] font-semibold mb-3">
            Products
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({products.length})
            </span>
          </h3>

          {products.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No products in this collection.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((p: any) => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 border rounded-lg p-3"
                >
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      className="w-12 h-12 rounded object-cover border shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.slug}</p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* META */}
        <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Collection ID</span>
            <p className="text-gray-500 break-all">{collection._id}</p>
          </div>
          <div>
            <span className="font-medium">Created</span>
            <p className="text-gray-500">
              {new Date(collection.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
