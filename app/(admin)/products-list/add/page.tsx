"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();
  const [collections, setCollections] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    images: [""],
    collection: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/collections/admin")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Create Product</h2>

      <input
        placeholder="Name"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Slug"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <input
        placeholder="Price"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <select
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, collection: e.target.value })}
      >
        <option>Select Collection</option>
        {collections.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
