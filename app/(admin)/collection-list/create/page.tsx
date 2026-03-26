"use client";

import { useState, useEffect, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateCollection() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Category state
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetch(`${API}/api/products/admin`)
      .then((r) => r.json())
      .then((r) => setProducts(r.data || []));
  }, []);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* ── Category tag helpers ── */
  const addCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !categoryNames.includes(trimmed)) {
      setCategoryNames((prev) => [...prev, trimmed]);
    }
    setCategoryInput("");
  };

  const removeCategory = (name: string) =>
    setCategoryNames((prev) => prev.filter((c) => c !== name));

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCategory();
    }
  };

  /* ── Product toggle ── */
  const toggleProduct = (id: string) =>
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  /* ── Image ── */
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("status", form.status);
      if (imageFile) formData.append("image", imageFile);

      selectedProducts.forEach((id) => formData.append("products", id));

      // Send each category name as a separate field
      categoryNames.forEach((name) => formData.append("categoryNames", name));

      const res = await fetch(`${API}/api/collections/admin`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Collection created! Redirecting...");
      setTimeout(() => router.push("/collection-list"), 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-transparent p-6 rounded-xl shadow-lg"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Create Colletion</h2>{" "}
          <Link
            href="/collection-list"
            className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Back Collections
          </Link>
        </div>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        {/* NAME */}
        <input
          placeholder="Collection Name"
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
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* ── CATEGORIES ── */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-medium">Categories</h3>

          {/* Tag pills */}
          {categoryNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categoryNames.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1 bg-[#c5a37e]/20 text-[#c5a37e] border border-[#c5a37e]/30 px-3 py-1 rounded-full text-sm"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeCategory(name)}
                    className="hover:text-red-500 transition"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input + Add */}
          <div className="flex gap-2">
            <input
              placeholder="Type a category and press Enter or comma"
              className="flex-1 border p-2 rounded text-sm"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={handleCategoryKeyDown}
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-[#c5a37e] text-white rounded text-sm hover:bg-[#b79268] transition"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Press Enter or comma to add multiple categories at once.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Assign Products</h3>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {products.map((product) => (
              <label
                key={product._id}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => toggleProduct(product._id)}
                />
                {product.name}
              </label>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-[#c5a37e] transition"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            {preview ? (
              <img src={preview} className="mx-auto max-h-40 rounded" />
            ) : (
              <>
                <p className="text-gray-500">Drag & Drop Image Here</p>
                <p className="text-sm text-gray-400">or Click to Upload</p>
              </>
            )}
          </label>
        </div>

        {/* STATUS */}
        <select
          className="w-full p-3 rounded bg-black text-white"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-[#c5a37e] hover:bg-[#b79268] text-white py-3 rounded font-medium cursor-pointer transition"
        >
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </form>
    </div>
  );
}
