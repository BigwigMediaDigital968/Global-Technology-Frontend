"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateProduct() {
  const router = useRouter();
  const params = useParams();

  const productId = params?.id as string | undefined;
  const isEdit = Boolean(productId);

  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [message, setMessage] = useState("");
  const [fileUpload, setFileUpload] = useState<File | null>(null);

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

  /* ================= FETCH COLLECTIONS ================= */

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/collections/admin`)
      .then((res) => res.json())
      .then((res) => setCollections(res.data || []));
  }, []);

  /* ================= FETCH PRODUCT FOR EDIT ================= */

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
          name: p?.name || "",
          slug: p?.slug || "",
          shortDescription: p?.shortDescription || "",
          longDescription: p?.longDescription || "",
          file: p?.file || "",

          images: p?.images && p.images.length > 0 ? p.images : [""],

          extraDetails: p?.extraDetails
            ? Object.entries(
                p.extraDetails instanceof Map
                  ? Object.fromEntries(p.extraDetails)
                  : p.extraDetails,
              ).map(([key, value]) => ({
                key,
                value: String(value),
              }))
            : [{ key: "", value: "" }],

          faqs:
            p?.faqs && Array.isArray(p.faqs) && p.faqs.length > 0
              ? p.faqs.map((f: any) => ({
                  question: String(f?.question || ""),
                  answer: String(f?.answer || ""),
                }))
              : [{ question: "", answer: "" }],

          collectionName: p?.collectionName?._id || p?.collectionName || "",

          status: p?.status || "active",
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
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

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: any) => {
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

    // form.extraDetails.forEach((d: any) => {
    //   if (d.key && d.value) {
    //     formData.append(`extraDetails[${d.key}]`, d.value);
    //   }
    // });

    // form.faqs
    //   .filter((f: any) => f.question && f.answer)
    //   .forEach((f: any, i: number) => {
    //     formData.append(`faqs[${i}][question]`, f.question);
    //     formData.append(`faqs[${i}][answer]`, f.answer);
    //   });

    formData.append("extraDetails", JSON.stringify(form.extraDetails));
    formData.append("faqs", JSON.stringify(form.faqs));

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    if (fileUpload) {
      formData.append("file", fileUpload);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await fetch(
        isEdit
          ? `${API_BASE_URL}/api/products/admin/${productId}`
          : `${API_BASE_URL}/api/products/admin`,
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        },
      );

      const json = await res.json();

      if (json.success) {
        setMessage(
          isEdit
            ? "Product updated successfully"
            : "Product created successfully",
        );

        setTimeout(() => {
          router.push("/products-list");
        }, 1000);
      } else {
        setMessage("Something went wrong");
      }
    } catch {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-transparent rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

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

          setForm((prev: any) => ({
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

      <textarea
        placeholder="Short Description"
        className="w-full border rounded-lg p-3"
        rows={3}
        value={form.shortDescription}
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
      />

      <textarea
        placeholder="Long Description"
        className="w-full border rounded-lg p-3 mt-3"
        rows={5}
        value={form.longDescription}
        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
      />

      {/* IMAGES */}
      <div>
        <label className="font-medium">Images</label>

        {form.images.map((img: string, i: number) => (
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
            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            setFileUpload(file);
          }}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#c5a37e] transition cursor-pointer bg-white/5"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setFileUpload(file);
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

          {/* Existing file when editing */}
          {form.file && !fileUpload && (
            <a
              href={`${API_BASE_URL}/${form.file}`}
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

        {form.extraDetails.map((detail: any, i: number) => (
          <div key={i} className="grid grid-cols-2 gap-3 mt-2">
            {/* KEY */}
            <input
              placeholder="Key (Material, Weight)"
              className="border rounded-lg p-3"
              value={detail.key}
              onChange={(e) => {
                const arr = [...form.extraDetails];
                arr[i].key = e.target.value;
                setForm({ ...form, extraDetails: arr });
              }}
            />

            {/* VALUE */}
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

            {/* REMOVE */}
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

        {/* ADD EXTRA DETAIL */}
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
        onChange={(e) => setForm({ ...form, collectionName: e.target.value })}
        className="w-full bg-transparent text-white border border-white rounded-lg p-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a37e]"
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

      {/* FAQS */}
      <div>
        <label className="font-medium">FAQs</label>

        {form.faqs.map((faq: any, i: number) => (
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

            {/* REMOVE FAQ */}
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

        {/* ADD FAQ */}
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
