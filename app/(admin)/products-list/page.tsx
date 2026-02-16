"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/admin")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          href="/products-list/add"
          className="bg-[#c5a37e] text-black px-4 py-2 rounded-lg"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-[#c5a37e] border-[#c5a37e]/40 text-black">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Collection</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">
                  <img
                    src={product.images?.[0]}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.collection?.name}</td>
                <td className="p-3">{product.status}</td>
                <td className="p-3 space-x-2">
                  <Link
                    href={`/products/edit/${product._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(product._id)}
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

  async function handleDelete(id: string) {
    await fetch(`http://localhost:8000/api/products/admin/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p: any) => p._id !== id));
  }
}
