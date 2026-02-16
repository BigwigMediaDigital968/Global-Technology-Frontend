"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCollection() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/collections");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl shadow space-y-4 max-w-2xl"
    >
      <h2 className="text-xl font-bold">Create Collection</h2>

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

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="w-full border p-2 rounded"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button className="bg-[#c5a37e] text-black font-medium px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
