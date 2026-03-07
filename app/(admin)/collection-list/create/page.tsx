"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateCollection() {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("status", form.status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch(`${API}/api/collections/admin`, {
      method: "POST",
      body: formData,
    });

    router.push("/collection-list");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 space-y-4 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold">Create Collection</h2>

      <input
        placeholder="Name"
        className="w-full border p-3 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
            slug: generateSlug(e.target.value),
          })
        }
        required
      />

      <input
        placeholder="Slug"
        className="w-full border p-3 rounded"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <select
        className="w-full border p-3 rounded"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button className="bg-[#c5a37e] px-6 py-3 rounded font-medium cursor-pointer">
        Create Collection
      </button>
    </form>
  );
}