"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string | undefined;
  const isEdit = Boolean(productId);

  const [collections, setCollections] = useState<any[]>([]);
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  // Multi-category state
  const [existingCategories, setExistingCategories] = useState<
    { _id: string; name: string }[]
  >([]);
  const [newCategoryNames, setNewCategoryNames] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryMode, setCategoryMode] = useState<"select" | "create">(
    "select",
  );

  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    images: [""],
    file: "",
    extraDetails: [{ key: "", value: "" }],
    faqs: [{ question: "", answer: "" }],
    collectionName: "",
    status: "active",
  });

  /* ── Fetch collections ── */
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/collections/admin`)
      .then((r) => r.json())
      .then((r) => setCollections(r.data || []));
  }, []);

  /* ── Fetch categories when collection changes ── */
  useEffect(() => {
    if (!form.collectionName) {
      setAvailableCategories([]);
      return;
    }
    fetch(`${API_BASE_URL}/api/categories/by-collection/${form.collectionName}`)
      .then((r) => r.json())
      .then((r) => setAvailableCategories(r.data || []));
  }, [form.collectionName]);

  /* ── Fetch product for edit ── */
  useEffect(() => {
    if (!isEdit) return;
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products/admin/${productId}`,
        );
        const json = await res.json();
        const p = json.data || json;

        setForm({
          name: p.name || "",
          slug: p.slug || "",
          shortDescription: p.shortDescription || "",
          longDescription: p.longDescription || "",
          file: p.file || "",
          images: p.images?.length ? p.images : [""],
          extraDetails: p.extraDetails
            ? Object.entries(
                p.extraDetails instanceof Map
                  ? Object.fromEntries(p.extraDetails)
                  : p.extraDetails,
              ).map(([key, value]) => ({ key, value: String(value) }))
            : [{ key: "", value: "" }],
          faqs: p.faqs?.length
            ? p.faqs.map((f: any) => ({
                question: String(f.question || ""),
                answer: String(f.answer || ""),
              }))
            : [{ question: "", answer: "" }],
          collectionName: p.collectionName?._id || p.collectionName || "",
          status: p.status || "active",
        });

        // Pre-populate existing categories (array)
        if (p.category?.length) {
          setExistingCategories(
            p.category.map((cat: any) =>
              typeof cat === "string"
                ? { _id: cat, name: cat }
                : { _id: cat._id, name: cat.name },
            ),
          );
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    }
    fetchProduct();
  }, [isEdit, productId]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  /* ── Category helpers ── */
  const addFromDropdown = (catId: string) => {
    const cat = availableCategories.find((c) => c._id === catId);
    if (!cat) return;
    const alreadyAdded = existingCategories.some((c) => c._id === catId);
    if (!alreadyAdded) {
      setExistingCategories((prev) => [
        ...prev,
        { _id: cat._id, name: cat.name },
      ]);
    }
  };

  const addNewCategory = () => {
    const trimmed = categoryInput.trim();
    const duplicate =
      newCategoryNames.some((n) => n.toLowerCase() === trimmed.toLowerCase()) ||
      existingCategories.some(
        (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
      );
    if (trimmed && !duplicate) {
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

  const removeExistingCategory = (id: string) =>
    setExistingCategories((prev) => prev.filter((c) => c._id !== id));

  const removeNewCategory = (name: string) =>
    setNewCategoryNames((prev) => prev.filter((n) => n !== name));

  /* ── Image ── */
  const handleImageSelect = (files: FileList | null, index: number) => {
    if (!files?.length) return;
    const file = files[0];
    const previews = [...form.images];
    previews[index] = URL.createObjectURL(file);
    const filesArr = [...imageFiles];
    filesArr[index] = file;
    setForm({ ...form, images: previews });
    setImageFiles(filesArr);
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.slug) formData.append("slug", form.slug);
    formData.append("shortDescription", form.shortDescription);
    formData.append("longDescription", form.longDescription);
    formData.append("collectionName", form.collectionName);
    formData.append("status", form.status);
    formData.append("extraDetails", JSON.stringify(form.extraDetails));
    formData.append("faqs", JSON.stringify(form.faqs));

    // Existing category IDs
    existingCategories.forEach((cat) =>
      formData.append("categoryIds", cat._id),
    );
    // New category names
    newCategoryNames.forEach((name) => formData.append("categoryNames", name));

    imageFiles.forEach((file) => formData.append("images", file));
    if (fileUpload) formData.append("file", fileUpload);

    try {
      const res = await fetch(
        isEdit
          ? `${API_BASE_URL}/api/products/admin/${productId}`
          : `${API_BASE_URL}/api/products/admin`,
        { method: isEdit ? "PUT" : "POST", body: formData },
      );
      const json = await res.json();
      if (json.success) {
        setMessage(isEdit ? "Product updated!" : "Product created!");
        setTimeout(() => router.push("/products-list"), 1000);
      } else {
        setMessage(json.message || "Something went wrong");
      }
    } catch {
      setMessage("Server error");
    }

    setLoading(false);
  };

  const totalCategories = existingCategories.length + newCategoryNames.length;

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-transparent rounded-xl shadow space-y-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">
          {isEdit ? "Edit Product" : "Create Product"}
        </h2>{" "}
        <Link
          href="/products-list"
          className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
        >
          Back Product List
        </Link>
      </div>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {/* NAME */}
      <input
        placeholder="Product Name"
        className="w-full border rounded-lg p-3"
        required
        value={form.name}
        onChange={(e) => {
          const name = e.target.value;
          setForm((prev) => ({
            ...prev,
            name,
            slug: isSlugEdited ? prev.slug : generateSlug(name),
          }));
        }}
      />

      {/* SLUG */}
      <input
        placeholder="Custom Slug"
        className="w-full border rounded-lg p-3"
        value={form.slug}
        onChange={(e) => {
          setIsSlugEdited(true);
          setForm({ ...form, slug: e.target.value });
        }}
      />

      {/* SHORT DESCRIPTION */}
      <textarea
        placeholder="Short Description"
        className="w-full border rounded-lg p-3"
        rows={3}
        required
        value={form.shortDescription}
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
      />

      {/* LONG DESCRIPTION */}
      <textarea
        placeholder="Long Description"
        className="w-full border rounded-lg p-3"
        rows={5}
        value={form.longDescription}
        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
      />

      {/* IMAGES */}
      <div>
        <label className="font-medium">Images</label>
        {form.images.map((img, i) => (
          <div key={i} className="mt-3 border p-3 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect(e.target.files, i)}
              className="cursor-pointer"
            />
            {img && (
              <img
                src={img}
                className="mt-3 h-24 w-24 object-cover rounded border"
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, images: [...form.images, ""] })}
          className="text-blue-600 text-sm mt-3 cursor-pointer"
        >
          + Add Image
        </button>
      </div>

      {/* FILE */}
      <div>
        <label className="font-medium block mb-2">
          Product File (PDF / Catalogue)
        </label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) setFileUpload(f);
          }}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#c5a37e] transition cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFileUpload(f);
            }}
            className="hidden"
            id="productFileUpload"
          />
          <label
            htmlFor="productFileUpload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <span className="text-3xl">📄</span>
            <p className="text-sm text-gray-600">Drag & drop your PDF here</p>
            <p className="text-xs text-gray-400">or click to browse</p>
          </label>
          {fileUpload && (
            <p className="mt-3 text-sm text-green-600">
              Selected: {fileUpload.name}
            </p>
          )}
          {form.file && !fileUpload && (
            <a
              href={form.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-3 underline"
            >
              View existing file
            </a>
          )}
        </div>
      </div>

      {/* EXTRA DETAILS */}
      <div>
        <label className="font-medium">Extra Details</label>
        {form.extraDetails.map((detail, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 mt-2">
            <input
              placeholder="Key"
              className="border rounded-lg p-3"
              value={detail.key}
              onChange={(e) => {
                const arr = [...form.extraDetails];
                arr[i].key = e.target.value;
                setForm({ ...form, extraDetails: arr });
              }}
            />
            <input
              placeholder="Value"
              className="border rounded-lg p-3"
              value={detail.value}
              onChange={(e) => {
                const arr = [...form.extraDetails];
                arr[i].value = e.target.value;
                setForm({ ...form, extraDetails: arr });
              }}
            />
            {form.extraDetails.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const arr = [...form.extraDetails];
                  arr.splice(i, 1);
                  setForm({ ...form, extraDetails: arr });
                }}
                className="text-red-600 text-sm cursor-pointer col-span-2"
              >
                Remove Detail
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              extraDetails: [...form.extraDetails, { key: "", value: "" }],
            })
          }
          className="text-blue-600 text-sm mt-3 cursor-pointer"
        >
          + Add Detail
        </button>
      </div>

      {/* COLLECTION */}
      <select
        value={form.collectionName}
        onChange={(e) => {
          setForm({ ...form, collectionName: e.target.value });
          // Reset categories when collection changes
          setExistingCategories([]);
          setNewCategoryNames([]);
        }}
        className="w-full bg-transparent text-white border border-white rounded-lg p-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
        required
      >
        <option className="text-black" value="">
          Select Collection
        </option>
        {collections.map((c) => (
          <option className="text-black" key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* ── CATEGORIES (multi) ── */}
      {form.collectionName && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium">
              Categories
              {totalCategories > 0 && (
                <span className="ml-2 text-xs text-gray-400">
                  ({totalCategories} selected)
                </span>
              )}
            </label>

            {/* Mode toggle */}
            <div className="flex gap-2 text-sm">
              <button
                type="button"
                onClick={() => setCategoryMode("select")}
                className={`px-3 py-1 rounded-full border transition cursor-pointer ${
                  categoryMode === "select"
                    ? "bg-[#c5a37e] text-black border-[#c5a37e]"
                    : "border-white text-white"
                }`}
              >
                Select Existing
              </button>
              <button
                type="button"
                onClick={() => setCategoryMode("create")}
                className={`px-3 py-1 rounded-full border transition cursor-pointer ${
                  categoryMode === "create"
                    ? "bg-[#c5a37e] text-black border-[#c5a37e]"
                    : "border-white text-white"
                }`}
              >
                + Create New
              </button>
            </div>
          </div>

          {/* Selected category pills */}
          {totalCategories > 0 && (
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
              {/* New (to be created) */}
              {newCategoryNames.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {name}
                  <span className="text-[10px] opacity-60">new</span>
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

          {/* Select from existing dropdown */}
          {categoryMode === "select" && (
            <div>
              <select
                onChange={(e) => {
                  addFromDropdown(e.target.value);
                  e.target.value = "";
                }}
                defaultValue=""
                className="w-full bg-transparent text-white border border-white rounded-lg p-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
              >
                <option className="text-black" value="">
                  {availableCategories.length === 0
                    ? "No categories yet — switch to Create New"
                    : "Pick a category to add..."}
                </option>
                {availableCategories
                  .filter(
                    (c) => !existingCategories.some((e) => e._id === c._id),
                  )
                  .map((c) => (
                    <option className="text-black" key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Select multiple by picking one at a time.
              </p>
            </div>
          )}

          {/* Create new category input */}
          {categoryMode === "create" && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  placeholder="Category name — press Enter or comma to add"
                  className="flex-1 border rounded-lg p-3 text-sm"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                />
                <button
                  type="button"
                  onClick={addNewCategory}
                  className="px-4 py-2 bg-[#c5a37e] text-black rounded-lg text-sm hover:bg-[#b79268] transition"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Amber pills = existing · Blue pills = new (created on save)
              </p>
            </div>
          )}
        </div>
      )}

      {/* FAQS */}
      <div>
        <label className="font-medium">FAQs</label>
        {form.faqs.map((faq, i) => (
          <div key={i} className="border rounded-lg p-3 mt-3 space-y-2">
            <input
              placeholder="Question"
              className="w-full border rounded-lg p-3"
              value={faq.question}
              onChange={(e) => {
                const arr = [...form.faqs];
                arr[i].question = e.target.value;
                setForm({ ...form, faqs: arr });
              }}
            />
            <textarea
              placeholder="Answer"
              className="w-full border rounded-lg p-3"
              rows={3}
              value={faq.answer}
              onChange={(e) => {
                const arr = [...form.faqs];
                arr[i].answer = e.target.value;
                setForm({ ...form, faqs: arr });
              }}
            />
            {form.faqs.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const arr = [...form.faqs];
                  arr.splice(i, 1);
                  setForm({ ...form, faqs: arr });
                }}
                className="text-red-600 text-sm cursor-pointer"
              >
                Remove FAQ
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              faqs: [...form.faqs, { question: "", answer: "" }],
            })
          }
          className="text-blue-600 text-sm mt-3 cursor-pointer"
        >
          + Add FAQ
        </button>
      </div>

      {/* STATUS */}
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full bg-transparent text-white border border-white rounded-lg p-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
      >
        <option className="text-black" value="active">
          Active
        </option>
        <option className="text-black" value="inactive">
          Inactive
        </option>
      </select>

      <button
        disabled={loading}
        className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-6 py-3 rounded-lg font-medium w-full cursor-pointer"
      >
        {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
      </button>
    </motion.form>
  );
}
