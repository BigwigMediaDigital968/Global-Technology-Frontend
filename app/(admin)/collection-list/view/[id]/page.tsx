"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CollectionView() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/collections/admin/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCollection(res.data || res);
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
        <div className="h-8 bg-gray-200 w-48 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 w-60 rounded"></div>
        <div className="h-6 bg-gray-200 w-40 rounded"></div>
      </div>
    );
  }

  if (!collection) return null;

  return (
    <div className="max-w-4xl space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 hover:text-[#c5a37e] cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <Link
          href={`/collection-list/edit/${collection._id}`}
          className="flex items-center gap-2 bg-[#c5a37e] text-white px-4 py-2 rounded-lg"
        >
          <Pencil size={16} />
          Edit Collection
        </Link>
      </div>

      {/* CARD */}

      <div className="bg-transparent rounded-xl shadow p-6 space-y-6">
        {/* IMAGE */}

        <div className="flex gap-6 items-center">
          <img
            src={collection.image}
            className="w-40 h-40 rounded-lg object-cover border"
          />

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-[#c5a37e]">
              {collection.name}
            </h1>

            <p className="text-gray-500 text-sm">Slug: {collection.slug}</p>

            {/* STATUS */}

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

          <p>{collection.description || "No description available"}</p>
        </div>

        {/* PRODUCTS */}

        <div>
          <h3 className="text-lg text-[#c5a37e] font-semibold mb-2">
            Products
          </h3>

          <p>{collection.products?.length || 0} products in this collection</p>
        </div>

        {/* META INFO */}

        <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Collection ID:</span>
            <p>{collection._id}</p>
          </div>

          <div>
            <span className="font-medium">Status:</span>
            <p>{collection.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
