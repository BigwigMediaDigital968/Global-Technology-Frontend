"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/collections/admin")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  async function handleDelete(id: string) {
    await fetch(`http://localhost:8000/api/collections/admin/${id}`, {
      method: "DELETE",
    });

    setCollections(collections.filter((c: any) => c._id !== id));
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Collections</h2>
        <Link
          href="/collection/create"
          className="bg-[#c5a37e] text-black font-medium px-4 py-2 rounded-lg"
        >
          Add Collection
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-[#c5a37e] border-[#c5a37e]/40 text-black">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection: any) => (
              <tr key={collection._id} className="border-t">
                <td className="p-3">
                  <img
                    src={collection.image}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{collection.name}</td>
                <td className="p-3">{collection.products?.length || 0}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      collection.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {collection.status}
                  </span>
                </td>
                <td className="p-3 space-x-3">
                  <Link
                    href={`/collections/edit/${collection._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(collection._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
