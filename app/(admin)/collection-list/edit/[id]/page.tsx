"use client";

import { useEffect, useState, DragEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function EditCollection() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Existing categories (from API, have _id + name)
  const [existingCategories, setExistingCategories] = useState<
    { _id: string; name: string }[]
  >([]);
  // New category names typed by user
  const [newCategoryNames, setNewCategoryNames] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  /* ── Fetch collection + products ── */
  useEffect(() => {
    async function fetchData() {
      try {
        const [collectionRes, productRes] = await Promise.all([
          fetch(`${API}/api/collections/admin/${id}`),
          fetch(`${API}/api/products/admin`),
        ]);
        const collectionData = await collectionRes.json();
        const productData = await productRes.json();

        const c = collectionData.data || collectionData;

        setForm({
          name: c.name,
          slug: c.slug,
          description: c.description || "",
          status: c.status,
        });
        setExistingImage(c.image);
        setProducts(productData.data || []);

        if (c.products) {
          setSelectedProducts(
            c.products.map((p: any) => (typeof p === "string" ? p : p._id)),
          );
        }

        // Pre-populate existing categories
        if (c.categories?.length) {
          setExistingCategories(
            c.categories.map((cat: any) =>
              typeof cat === "string"
                ? { _id: cat, name: cat }
                : { _id: cat._id, name: cat.name },
            ),
          );
        }
      } catch {
        setError("Failed to load collection");
      } finally {
        setFetching(false);
      }
    }
    fetchData();
  }, [id]);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* ── Category helpers ── */
  const addNewCategory = () => {
    const trimmed = categoryInput.trim();
    const alreadyExists =
      existingCategories.some(
        (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
      ) ||
      newCategoryNames.some((n) => n.toLowerCase() === trimmed.toLowerCase());

    if (trimmed && !alreadyExists) {
      setNewCategoryNames((prev) => [...prev, trimmed]);
    }
    setCategoryInput("");
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addNewCategory();
    }
  };

  // Remove from existing (already saved to DB)
  const removeExistingCategory = (catId: string) =>
    setExistingCategories((prev) => prev.filter((c) => c._id !== catId));

  // Remove from newly typed ones
  const removeNewCategory = (name: string) =>
    setNewCategoryNames((prev) => prev.filter((n) => n !== name));

  /* ── Product toggle ── */
  const toggleProduct = (pid: string) =>
    setSelectedProducts((prev) =>
      prev.includes(pid) ? prev.filter((p) => p !== pid) : [...prev, pid],
    );

  /* ── Image ── */
  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("status", form.status);
      if (imageFile) formData.append("image", imageFile);

      selectedProducts.forEach((pid) => formData.append("products", pid));

      // Existing category IDs (kept ones)
      existingCategories.forEach((cat) =>
        formData.append("categoryIds", cat._id),
      );

      // New category names to create
      newCategoryNames.forEach((name) =>
        formData.append("categoryNames", name),
      );

      // Replace mode — send all kept IDs + new names
      formData.append("categoryMode", "replace");

      const res = await fetch(`${API}/api/collections/admin/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Collection updated successfully!");
      setTimeout(() => router.push("/collection-list"), 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="animate-pulse space-y-4 max-w-3xl mx-auto p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-transparent p-6 rounded-xl shadow-lg"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Edit Colletion</h2>{" "}
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
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Categories</h3>
            <span className="text-xs text-gray-400">
              {existingCategories.length + newCategoryNames.length} total
            </span>
          </div>

          {/* All pills — existing + new */}
          {(existingCategories.length > 0 || newCategoryNames.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {/* Existing (saved) */}
              {existingCategories.map((cat) => (
                <span
                  key={cat._id}
                  className="flex items-center gap-1 bg-[#c5a37e]/20 text-[#c5a37e] border border-[#c5a37e]/30 px-3 py-1 rounded-full text-sm"
                >
                  {cat.name}
                  <button
                    type="button"
                    onClick={() => removeExistingCategory(cat._id)}
                    className="hover:text-red-500 transition"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}

              {/* New (not yet saved) */}
              {newCategoryNames.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {name}
                  <span className="text-[10px] opacity-60 ml-0.5">new</span>
                  <button
                    type="button"
                    onClick={() => removeNewCategory(name)}
                    className="hover:text-red-500 transition"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input
              placeholder="Add category and press Enter or comma"
              className="flex-1 border p-2 rounded text-sm"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={handleCategoryKeyDown}
            />
            <button
              type="button"
              onClick={addNewCategory}
              className="px-4 py-2 bg-[#c5a37e] text-white rounded text-sm hover:bg-[#b79268] transition"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Amber = saved categories · Blue = new categories to be created on
            save.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Assigned Products</h3>
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
        <div className="space-y-3">
          {!preview && existingImage && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Current Image</p>
              <img
                src={existingImage}
                className="w-40 h-40 object-cover rounded border"
              />
            </div>
          )}
          {preview && (
            <div>
              <p className="text-sm text-gray-500 mb-2">New Image Preview</p>
              <img
                src={preview}
                className="w-40 h-40 object-cover rounded border"
              />
            </div>
          )}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-[#c5a37e] transition"
          >
            <input
              type="file"
              accept="image/*"
              id="upload"
              className="hidden"
              onChange={(e) => handleImageSelect(e.target.files?.[0] as File)}
            />
            <label htmlFor="upload" className="cursor-pointer">
              <p className="text-gray-500">Drag & Drop Image Here</p>
              <p className="text-sm text-gray-400">or Click to Upload</p>
            </label>
          </div>
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
          {loading ? "Updating..." : "Update Collection"}
        </button>
      </form>
    </div>
  );
}
