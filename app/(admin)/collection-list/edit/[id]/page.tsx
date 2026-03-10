// "use client";

// import { useEffect, useState, DragEvent } from "react";
// import { useRouter, useParams } from "next/navigation";

// const API = process.env.NEXT_PUBLIC_BASE_URI;

// export default function EditCollection() {
//   const router = useRouter();
//   const params = useParams();
//   const id = params?.id as string;

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [existingImage, setExistingImage] = useState<string | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     status: "active",
//   });

//   /* ================= FETCH COLLECTION ================= */

//   useEffect(() => {
//     async function fetchCollection() {
//       try {
//         const res = await fetch(`${API}/api/collections/admin/${id}`);
//         const data = await res.json();

//         const c = data.data || data;

//         setForm({
//           name: c.name,
//           slug: c.slug,
//           description: c.description,
//           status: c.status,
//         });

//         setExistingImage(c.image);
//       } catch {
//         setError("Failed to load collection");
//       }
//     }

//     fetchCollection();
//   }, [id]);

//   /* ================= SLUG GENERATOR ================= */

//   const generateSlug = (text: string) =>
//     text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

//   /* ================= IMAGE HANDLING ================= */

//   const handleImageSelect = (file: File) => {
//     setImageFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     const file = e.dataTransfer.files[0];
//     if (file) handleImageSelect(file);
//   };

//   /* ================= SUBMIT ================= */

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const formData = new FormData();

//       formData.append("name", form.name);
//       formData.append("slug", form.slug);
//       formData.append("description", form.description);
//       formData.append("status", form.status);

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const res = await fetch(`${API}/api/collections/admin/${id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setSuccess("Collection updated successfully 🎉");

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
//         <h2 className="text-2xl font-semibold">Edit Collection</h2>

//         {/* SUCCESS MESSAGE */}

//         {success && (
//           <div className="bg-green-100 text-green-700 p-3 rounded">
//             {success}
//           </div>
//         )}

//         {/* ERROR MESSAGE */}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
//         )}

//         {/* NAME */}

//         <input
//           placeholder="Collection Name"
//           className="w-full border p-3 rounded focus:ring-2 focus:ring-[#c5a37e] outline-none"
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

//         {/* SLUG */}

//         <input
//           placeholder="Slug"
//           className="w-full border p-3 rounded focus:ring-2 focus:ring-[#c5a37e] outline-none"
//           value={form.slug}
//           onChange={(e) => setForm({ ...form, slug: e.target.value })}
//         />

//         {/* DESCRIPTION */}

//         <textarea
//           placeholder="Description"
//           className="w-full border p-3 rounded focus:ring-2 focus:ring-[#c5a37e] outline-none"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         {/* IMAGE SECTION */}

//         <div className="space-y-3">
//           <label className="font-medium">Collection Image</label>

//           {/* EXISTING IMAGE */}

//           {!preview && existingImage && (
//             <div>
//               <p className="text-sm text-gray-500 mb-2">Current Image</p>
//               <img
//                 src={existingImage}
//                 alt="collection"
//                 className="w-40 h-40 object-cover rounded border"
//               />
//             </div>
//           )}

//           {/* NEW IMAGE PREVIEW */}

//           {preview && (
//             <div>
//               <p className="text-sm text-gray-500 mb-2">New Image Preview</p>
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-40 h-40 object-cover rounded border"
//               />
//             </div>
//           )}

//           {/* DRAG DROP */}

//           <div
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={handleDrop}
//             className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-[#c5a37e] transition"
//           >
//             <input
//               type="file"
//               accept="image/*"
//               id="upload"
//               className="hidden"
//               onChange={(e) => handleImageSelect(e.target.files?.[0] as File)}
//             />

//             <label htmlFor="upload" className="cursor-pointer">
//               <p className="text-gray-500">Drag & Drop Image Here</p>
//               <p className="text-sm text-gray-400">or Click to Upload</p>
//             </label>
//           </div>
//         </div>

//         {/* STATUS */}

//         <select
//           className="w-full p-3 rounded bg-black text-white"
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value })}
//         >
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>

//         {/* BUTTON */}

//         <button
//           disabled={loading}
//           className="w-full bg-[#c5a37e] hover:bg-[#b79268] text-white py-3 rounded font-medium transition"
//         >
//           {loading ? "Updating..." : "Update Collection"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, DragEvent } from "react";
import { useRouter, useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function EditCollection() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
  });

  /* ================= FETCH COLLECTION + PRODUCTS ================= */

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
          description: c.description,
          status: c.status,
        });

        setExistingImage(c.image);

        setProducts(productData.data || []);

        /* preselect products */
        if (c.products) {
          setSelectedProducts(c.products.map((p: any) => p._id));
        }
      } catch {
        setError("Failed to load collection");
      }
    }

    fetchData();
  }, [id]);

  /* ================= SLUG ================= */

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /* ================= PRODUCT SELECT ================= */

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  /* ================= IMAGE ================= */

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  /* ================= SUBMIT ================= */

  async function handleSubmit(e: any) {
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

      if (imageFile) {
        formData.append("image", imageFile);
      }

      /* send products */
      selectedProducts.forEach((id) => {
        formData.append("products", id);
      });

      const res = await fetch(`${API}/api/collections/admin/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess("Collection updated successfully 🎉");

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
        <h2 className="text-2xl font-semibold">Edit Collection</h2>

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

        {/* PRODUCT SELECTOR */}

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
            <img
              src={existingImage}
              className="w-40 h-40 object-cover rounded border"
            />
          )}

          {preview && (
            <img
              src={preview}
              className="w-40 h-40 object-cover rounded border"
            />
          )}

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              id="upload"
              className="hidden"
              onChange={(e) => handleImageSelect(e.target.files?.[0] as File)}
            />

            <label htmlFor="upload" className="cursor-pointer">
              Drag & Drop Image or Click
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

        {/* BUTTON */}

        <button
          disabled={loading}
          className="w-full bg-[#c5a37e] hover:bg-[#b79268] text-white py-3 rounded"
        >
          {loading ? "Updating..." : "Update Collection"}
        </button>
      </form>
    </div>
  );
}
