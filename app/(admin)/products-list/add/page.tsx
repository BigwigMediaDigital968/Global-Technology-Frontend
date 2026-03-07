"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateProduct() {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const productId = params?.id as string | undefined;
  const isEdit = Boolean(productId);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const [form, setForm] = useState<any>({
    name: "",
    slug: "",
    price: "",
    images: [""], // UI preview only
    sizes: [""],
    extraDetails: [{ key: "", value: "" }],
    faqs: [{ question: "", answer: "" }],
    collection: "",
    status: "active",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/collections/admin`)
      .then((res) => res.json())
      .then((res) => setCollections(res.data || res));
  }, []);

  /* ================= IMAGE FILE HANDLING ================= */

  const handleImageSelect = (files: FileList | null, index: number) => {
    if (!files || !files[0]) return;

    const file = files[0];

    const updatedImages = [...form.images];
    updatedImages[index] = URL.createObjectURL(file);

    setForm({ ...form, images: updatedImages });

    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    if (form.slug) formData.append("slug", form.slug);
    formData.append("price", String(form.price));
    formData.append("collection", form.collection);
    formData.append("status", form.status);

    form.sizes.filter(Boolean).forEach((s: string) => {
      formData.append("sizes[]", s);
    });

    form.extraDetails
      .filter((d: any) => d.key && d.value)
      .forEach((d: any) => {
        formData.append(`extraDetails[${d.key}]`, d.value);
      });

    form.faqs.forEach((f: any, i: number) => {
      formData.append(`faqs[${i}][question]`, f.question);
      formData.append(`faqs[${i}][answer]`, f.answer);
    });

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    await fetch(
      isEdit
        ? `${API_BASE_URL}/api/products/admin/${productId}`
        : `${API_BASE_URL}/api/products/admin`,
      {
        method: isEdit ? "PUT" : "POST",
        body: formData,
      },
    );

    router.push("/products-list");
  };

  useEffect(() => {
    if (!isEdit) return;

    fetch(`${API_BASE_URL}/api/products/admin/${productId}`)
      .then((res) => res.json())
      .then((res) => {
        const p = res.data || res;

        setForm({
          name: p.name || "",
          slug: p.slug || "",
          price: String(p.price || ""),
          images: p.images?.length ? p.images : [""], // existing cloudinary URLs
          sizes: p.sizes?.length ? p.sizes : [""],
          extraDetails: Object.entries(p.extraDetails || {}).map(
            ([key, value]: any) => ({ key, value }),
          ),
          faqs: p.faqs?.length ? p.faqs : [{ question: "", answer: "" }],
          collection: p.collection?._id || p.collection || "",
          status: p.status || "active",
        });
      });
  }, [isEdit, productId]);

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      {/* BASIC INFO */}
      <input
        placeholder="Product Name"
        className="w-full border rounded-lg p-3"
        required
        value={form.name}
        onChange={(e) => {
          const name = e.target.value;

          setForm((prev: any) => ({
            ...prev,
            name,
            slug: isSlugEdited ? prev.slug : generateSlug(name),
          }));
        }}
      />

      <input
        placeholder="Custom Slug (optional)"
        className="w-full border rounded-lg p-3"
        value={form.slug}
        onChange={(e) => {
          setIsSlugEdited(true);
          setForm({ ...form, slug: e.target.value });
        }}
        onBlur={() => {
          // If user clears slug, resume auto-generation
          if (!form.slug) setIsSlugEdited(false);
        }}
      />

      <input
        type="number"
        placeholder="Price (Rs.)"
        className="w-full border rounded-lg p-3"
        required
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* IMAGES (UI SAME) */}
      <div>
        <label className="font-medium">Images</label>

        {form.images.map((img: string, i: number) => (
          <div key={i} className="mt-2">
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg p-3"
              onChange={(e) => handleImageSelect(e.target.files, i)}
            />

            {img && (
              <img
                src={img}
                className="mt-2 h-24 w-24 object-cover rounded"
              />
            )}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (i === 0) return;
                  const imgs = [...form.images];
                  [imgs[i - 1], imgs[i]] = [imgs[i], imgs[i - 1]];
                  setForm({ ...form, images: imgs });
                }}
                className="text-sm"
              >
                ↑
              </button>

              <button
                type="button"
                onClick={() => {
                  if (i === form.images.length - 1) return;
                  const imgs = [...form.images];
                  [imgs[i + 1], imgs[i]] = [imgs[i], imgs[i + 1]];
                  setForm({ ...form, images: imgs });
                }}
                className="text-sm"
              >
                ↓
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setForm({ ...form, images: [...form.images, ""] })}
          className="text-sm text-blue-600 mt-2"
        >
          + Add Image
        </button>
      </div>

      {/* SIZES */}
      <div>
        <label className="font-medium">Sizes</label>
        {form.sizes.map((size: string, i: number) => (
          <input
            key={i}
            placeholder="Size (S, M, L...)"
            className="w-full border rounded-lg p-3 mt-2"
            value={size}
            onChange={(e) => {
              const sizes = [...form.sizes];
              sizes[i] = e.target.value;
              setForm({ ...form, sizes });
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, sizes: [...form.sizes, ""] })}
          className="text-sm text-blue-600 mt-2"
        >
          + Add Size
        </button>
      </div>

      {/* EXTRA DETAILS */}
      <div>
        <label className="font-medium">Extra Details</label>
        {form.extraDetails.map((item: any, i: number) => (
          <div key={i} className="grid grid-cols-2 gap-2 mt-2">
            <input
              placeholder="Key"
              className="border rounded-lg p-2"
              value={item.key}
              onChange={(e) => {
                const arr = [...form.extraDetails];
                arr[i].key = e.target.value;
                setForm({ ...form, extraDetails: arr });
              }}
            />
            <input
              placeholder="Value"
              className="border rounded-lg p-2"
              value={item.value}
              onChange={(e) => {
                const arr = [...form.extraDetails];
                arr[i].value = e.target.value;
                setForm({ ...form, extraDetails: arr });
              }}
            />
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
          className="text-sm text-blue-600 mt-2"
        >
          + Add Detail
        </button>
      </div>

      {/* FAQS */}
      <div>
        <label className="font-medium">FAQs</label>
        {form.faqs.map((faq: any, i: number) => (
          <div key={i} className="space-y-2 mt-2">
            <input
              placeholder="Question"
              className="w-full border rounded-lg p-2"
              value={faq.question}
              onChange={(e) => {
                const arr = [...form.faqs];
                arr[i].question = e.target.value;
                setForm({ ...form, faqs: arr });
              }}
            />
            <input
              placeholder="Answer"
              className="w-full border rounded-lg p-2"
              value={faq.answer}
              onChange={(e) => {
                const arr = [...form.faqs];
                arr[i].answer = e.target.value;
                setForm({ ...form, faqs: arr });
              }}
            />
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
          className="text-sm text-blue-600 mt-2"
        >
          + Add FAQ
        </button>
      </div>

      {/* COLLECTION */}
      <select
        className="w-full border rounded-lg p-3"
        
        onChange={(e) => setForm({ ...form, collection: e.target.value })}
      >
        <option value="">Select Collection</option>
        {collections.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* STATUS */}
      <select
        className="w-full border rounded-lg p-3"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        disabled={loading}
        className="bg-[#c5a37e] hover:bg-[#b59572] transition text-black px-6 py-3 rounded-lg font-medium w-full"
      >
        {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
      </button>
    </motion.form>
  );
}