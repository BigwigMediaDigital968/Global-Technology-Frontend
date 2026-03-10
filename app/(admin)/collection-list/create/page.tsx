// "use client";

// import { useState, DragEvent } from "react";
// import { useRouter } from "next/navigation";

// const API = process.env.NEXT_PUBLIC_BASE_URI;

// export default function CreateCollection() {
//   const router = useRouter();

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     status: "active",
//   });

//   const generateSlug = (text: string) =>
//     text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

//   /* ---------------- Drag Drop ---------------- */

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setImageFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleFileSelect = (file: File) => {
//     setImageFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   /* ---------------- Submit ---------------- */

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("slug", form.slug);
//       formData.append("description", form.description);
//       formData.append("status", form.status);

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const res = await fetch(`${API}/api/collections/admin`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setSuccess(
//         "Collection created successfully! Redireting to collection list...",
//       );

//       setForm({
//         name: "",
//         slug: "",
//         description: "",
//         status: "active",
//       });

//       setImageFile(null);
//       setPreview(null);

//       setTimeout(() => {
//         router.push("/collection-list");
//       }, 1500);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-5 bg-transparent p-6 rounded-xl shadow-lg"
//       >
//         <h2 className="text-2xl font-semibold">Create Collection</h2>

//         {/* Success Message */}

//         {success && (
//           <div className="bg-green-100 text-green-700 p-3 rounded">
//             {success}
//           </div>
//         )}

//         {/* Error Message */}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
//         )}

//         {/* Name */}

//         <input
//           placeholder="Collection Name"
//           className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c5a37e]"
//           value={form.name}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               name: e.target.value,
//               slug: generateSlug(e.target.value),
//             })
//           }
//           required
//         />

//         {/* Slug */}

//         <input
//           placeholder="Slug"
//           className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c5a37e]"
//           value={form.slug}
//           onChange={(e) => setForm({ ...form, slug: e.target.value })}
//         />

//         {/* Description */}

//         <textarea
//           placeholder="Description"
//           className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c5a37e]"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         {/* Drag Drop Upload */}

//         <div
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={handleDrop}
//           className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-[#c5a37e] transition"
//         >
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             id="fileUpload"
//             onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
//           />

//           <label htmlFor="fileUpload" className="cursor-pointer">
//             {!preview && (
//               <div>
//                 <p className="text-gray-500">Drag & Drop Image Here</p>
//                 <p className="text-sm text-gray-400">or Click to Upload</p>
//               </div>
//             )}

//             {preview && (
//               <img src={preview} className="mx-auto max-h-40 rounded" />
//             )}
//           </label>
//         </div>

//         {/* Status */}

//         <select
//           className="w-full p-3 rounded bg-black text-white"
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value })}
//         >
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>

//         {/* Button */}

//         <button
//           disabled={loading}
//           className="w-full bg-[#c5a37e] hover:bg-[#b79268] text-white py-3 rounded font-medium transition"
//         >
//           {loading ? "Creating..." : "Create Collection"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, DragEvent } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CreateCollection() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    fetch(`${API}/api/products/admin`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data || []));
  }, []);

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* ---------------- PRODUCT SELECT ---------------- */

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  /* ---------------- Drag Drop ---------------- */

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

  /* ---------------- Submit ---------------- */

  async function handleSubmit(e: any) {
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

      if (imageFile) {
        formData.append("image", imageFile);
      }

      /* Send selected products */
      selectedProducts.forEach((id) => {
        formData.append("products", id);
      });

      const res = await fetch(`${API}/api/collections/admin`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess(
        "Collection created successfully! Redirecting to collection list...",
      );

      setForm({
        name: "",
        slug: "",
        description: "",
        status: "active",
      });

      setSelectedProducts([]);
      setImageFile(null);
      setPreview(null);

      setTimeout(() => {
        router.push("/collection-list");
      }, 1500);
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
        <h2 className="text-2xl font-semibold">Create Collection</h2>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        {/* Name */}

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

        {/* Slug */}

        <input
          placeholder="Slug"
          className="w-full border p-3 rounded"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        {/* Description */}

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* PRODUCT SELECTOR */}

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

        {/* Drag Drop Upload */}

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileUpload"
            onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
          />

          <label htmlFor="fileUpload" className="cursor-pointer">
            {!preview && (
              <>
                <p className="text-gray-500">Drag & Drop Image Here</p>
                <p className="text-sm text-gray-400">or Click to Upload</p>
              </>
            )}

            {preview && (
              <img src={preview} className="mx-auto max-h-40 rounded" />
            )}
          </label>
        </div>

        {/* Status */}

        <select
          className="w-full p-3 rounded bg-black text-white"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Button */}

        <button
          disabled={loading}
          className="w-full bg-[#c5a37e] hover:bg-[#b79268] text-white py-3 rounded font-medium cursor-pointer"
        >
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </form>
    </div>
  );
}
