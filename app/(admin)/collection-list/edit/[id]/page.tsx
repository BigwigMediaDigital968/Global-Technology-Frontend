"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function EditCollection() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  /* ================= FETCH COLLECTION ================= */

  useEffect(() => {
    fetch(`${API}/api/collections/admin/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const c = res.data || res;

        setForm({
          name: c.name,
          slug: c.slug,
          description: c.description,
          status: c.status,
        });

        setExistingImage(c.image);
      });
  }, [id]);

  /* ================= SLUG GENERATOR ================= */

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* ================= IMAGE PREVIEW ================= */

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */

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

    await fetch(`${API}/api/collections/admin/${id}`, {
      method: "PUT",
      body: formData,
    });

    router.push("/collection-list");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 space-y-5 rounded-xl shadow"
    >
      <h2 className="text-xl font-bold">Edit Collection</h2>

      {/* NAME */}
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

      {/* SLUG */}
      <input
        placeholder="Slug"
        className="w-full border p-3 rounded"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        className="w-full border p-3 rounded"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* IMAGE SECTION */}

      <div className="space-y-3">
        <label className="font-medium">Collection Image</label>

        {/* EXISTING IMAGE */}
        {!preview && existingImage && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Current Image</p>
            <img
              src={existingImage}
              alt="collection"
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}

        {/* NEW IMAGE PREVIEW */}
        {preview && (
          <div>
            <p className="text-sm text-gray-500 mb-2">New Image Preview</p>
            <img
              src={preview}
              alt="preview"
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageChange(e.target.files?.[0] || null)
          }
        />
      </div>

      {/* STATUS */}
      <select
        className="w-full border p-3 rounded"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* BUTTON */}
      <button className="bg-[#c5a37e] px-6 py-3 rounded font-medium cursor-pointer">
        Update Collection
      </button>
    </form>
  );
}