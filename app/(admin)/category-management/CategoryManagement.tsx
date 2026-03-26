"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_BASE_URI;

interface Category {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  collectionName: {
    _id: string;
    name: string;
    slug?: string;
  };
  createdAt: string;
}
interface Collection {
  _id: string;
  name: string;
}

// tiny reusable modal shell
function Modal({
  open,
  onClose,
  children,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`relative w-full ${width} bg-white rounded-2xl shadow-2xl`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── feedback modals ────────────────────────────────────── */
function SuccessModal({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) {
      const t = setTimeout(onClose, 2000);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} width="max-w-sm">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <p className="font-medium text-gray-800">{message}</p>
        <p className="text-xs text-gray-400">Closing automatically…</p>
      </div>
    </Modal>
  );
}

function ConfirmModal({
  open,
  title,
  message,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} width="max-w-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500 mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 cursor-pointer transition"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ─── main component ─────────────────────────────────────── */
export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  /* search / filter / pagination */
  const [search, setSearch] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  /* modal states */
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  /* selected category */
  const [selected, setSelected] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  /* form state */
  type FormState = {
    name: string;
    collectionName: string;
    status: "active" | "inactive";
  };

  const emptyForm: FormState = {
    name: "",
    collectionName: "",
    status: "active",
  };

  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  /* ── fetch ── */
  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/categories`).then((r) => r.json()),
      fetch(`${API}/api/collections/admin`).then((r) => r.json()),
    ]).then(([catRes, colRes]) => {
      setCategories(catRes.data || []);
      setCollections(colRes.data || []);
      setLoading(false);
    });
  }, []);

  /* ── helpers ── */
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
  };

  const collectionName = (cat: Category) => {
    if (!cat.collectionName) return "—";
    if (typeof cat.collectionName === "string") return cat.collectionName;
    return cat.collectionName.name;
  };

  /* ── filter + paginate ── */
  const filtered = categories.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCol = collectionFilter
      ? typeof c.collectionName === "object"
        ? c.collectionName._id === collectionFilter
        : c.collectionName === collectionFilter
      : true;
    const matchStatus = statusFilter ? c.status === statusFilter : true;
    return matchSearch && matchCol && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── ADD ── */
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.collectionName) {
      setFormError("Name and collection are required.");
      return;
    }
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch(`${API}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          collectionName: form.collectionName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCategories((prev) => [data.data, ...prev]);
      setAddOpen(false);
      setForm(emptyForm);
      showSuccess("Category created successfully!");
    } catch (err: any) {
      setFormError(err.message || "Something went wrong");
    }
    setFormLoading(false);
  }

  /* ── EDIT ── */
  function openEdit(cat: Category) {
    setSelected(cat);
    setForm({
      name: cat.name,
      collectionName:
        typeof cat.collectionName === "object"
          ? cat.collectionName._id
          : cat.collectionName,
      status: cat.status,
    });
    setFormError("");
    setEditOpen(true);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError("Name is required.");
      return;
    }
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch(`${API}/api/categories/${selected!._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), status: form.status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCategories((prev) =>
        prev.map((c) => (c._id === selected!._id ? { ...c, ...data.data } : c)),
      );
      setEditOpen(false);
      showSuccess("Category updated successfully!");
    } catch (err: any) {
      setFormError(err.message || "Something went wrong");
    }
    setFormLoading(false);
  }

  /* ── DELETE ── */
  function openDelete(id: string) {
    setDeleteId(id);
    setConfirmOpen(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      await fetch(`${API}/api/categories/${deleteId}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c._id !== deleteId));
      setConfirmOpen(false);
      showSuccess("Category deleted.");
    } catch {
      setConfirmOpen(false);
    }
    setActionLoading(false);
    setDeleteId(null);
  }

  /* ── STATUS TOGGLE ── */
  async function toggleStatus(cat: Category) {
    const newStatus = cat.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`${API}/api/categories/${cat._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? { ...c, status: newStatus } : c)),
      );
      showSuccess(`Category marked ${newStatus}.`);
    } catch {}
  }

  /* ── shared form fields ── */
  const CategoryForm = ({
    onSubmit,
    submitLabel,
    showCollection = true,
  }: {
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    showCollection?: boolean;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      {formError && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {formError}
        </p>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Category name
        </label>
        <input
          placeholder="e.g. Pumps, Valves, Fittings"
          className="w-full border text-black border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/40 focus:border-[#c5a37e] transition"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoFocus
        />
      </div>

      {showCollection && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Collection
          </label>
          <select
            className="w-full border text-black border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/40 focus:border-[#c5a37e] cursor-pointer transition"
            value={form.collectionName}
            onChange={(e) =>
              setForm({ ...form, collectionName: e.target.value })
            }
          >
            <option value="">Select collection</option>
            {collections.map((col) => (
              <option key={col._id} value={col._id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          className="w-full border text-black border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/40 focus:border-[#c5a37e] cursor-pointer transition"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as "active" | "inactive",
            })
          }
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            setAddOpen(false);
            setEditOpen(false);
            setFormError("");
          }}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formLoading}
          className="px-5 py-2 text-sm bg-[#c5a37e] hover:bg-[#b79268] text-white rounded-lg disabled:opacity-50 cursor-pointer transition font-medium"
        >
          {formLoading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );

  console.log(categories);

  /* ── render ── */
  return (
    <div className="space-y-6">
      {/* ── PAGE HEADER ── */}
      <h2 className="text-2xl font-bold text-[#ffffff]">Category Management</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#c5a37e]/10 flex items-center justify-center">
            <Tag size={18} className="text-[#c5a37e]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="text-sm text-gray-400">{categories.length} total</p>
          </div>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setFormError("");
            setAddOpen(true);
          }}
          className="flex items-center gap-2 bg-[#c5a37e] hover:bg-[#b79268] text-white px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* ── FILTERS ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search categories…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/30 focus:border-[#c5a37e] transition"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* COLLECTION FILTER */}
          <div className="relative min-w-[180px]">
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-200 bg-white rounded-xl px-3 pr-9 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/30 focus:border-[#c5a37e] cursor-pointer transition"
                value={collectionFilter}
                onChange={(e) => {
                  setCollectionFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Collections</option>
                {collections.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.name}
                  </option>
                ))}
              </select>

              {/* dropdown icon */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </div>
            </div>
          </div>

          {/* STATUS FILTER */}
          <div className="relative min-w-[150px]">
            <div className="relative">
              <select
                className="w-full appearance-none border border-gray-200 bg-white rounded-xl px-3 pr-9 py-2.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c5a37e]/30 focus:border-[#c5a37e] cursor-pointer transition"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Status</option>
                <option value="active">🟢 Active</option>
                <option value="inactive">🔴 Inactive</option>
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#c5a37e]/10 border-b border-gray-100">
              <th className="px-5 py-3.5 text-left font-medium text-gray-200">
                Name
              </th>
              <th className="px-5 py-3.5 text-left font-medium text-gray-200">
                Collection
              </th>
              <th className="px-5 py-3.5 text-left font-medium text-gray-200">
                Slug
              </th>
              <th className="px-5 py-3.5 text-left font-medium text-gray-200">
                Status
              </th>
              <th className="px-5 py-3.5 text-left font-medium text-gray-200">
                Created
              </th>
              <th className="px-5 py-3.5 text-right font-medium text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50 animate-pulse">
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-gray-100 rounded w-24" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && paginated.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-400"
                >
                  No categories found.
                </td>
              </tr>
            )}

            {paginated.map((cat, i) => (
              <motion.tr
                key={cat._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-gray-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#c5a37e]/10 flex items-center justify-center shrink-0">
                      <Tag size={13} className="text-[#c5a37e]" />
                    </div>
                    <span className="font-medium text-gray-100">
                      {cat.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-100">
                  {cat.collectionName?.name || "—"}
                </td>

                <td className="px-5 py-4">
                  <span className="font-mono text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded">
                    {cat.slug}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => toggleStatus(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                      cat.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {cat.status}
                  </button>
                </td>

                <td className="px-5 py-4 text-gray-400 text-xs">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => {
                        setSelected(cat);
                        setViewOpen(true);
                      }}
                      title="View"
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 cursor-pointer transition"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => openEdit(cat)}
                      title="Edit"
                      className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 cursor-pointer transition"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => openDelete(cat._id)}
                      title="Delete"
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 cursor-pointer transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── PAGINATION ── */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {(page - 1) * PER_PAGE + 1}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer transition"
            >
              <ChevronLeft size={15} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium cursor-pointer transition ${
                  page === i + 1
                    ? "bg-[#c5a37e] text-white"
                    : "border border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer transition"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════ */}

      {/* ADD MODAL */}
      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
          setFormError("");
        }}
      >
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#c5a37e]/10 flex items-center justify-center">
                <Plus size={16} className="text-[#c5a37e]" />
              </div>
              <h3 className="font-semibold text-gray-800">Add Category</h3>
            </div>
            <button
              onClick={() => {
                setAddOpen(false);
                setFormError("");
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <CategoryForm onSubmit={handleAdd} submitLabel="Create Category" />
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setFormError("");
        }}
      >
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Pencil size={15} className="text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-800">Edit Category</h3>
            </div>
            <button
              onClick={() => {
                setEditOpen(false);
                setFormError("");
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <CategoryForm
            onSubmit={handleEdit}
            submitLabel="Save Changes"
            showCollection={false}
          />
        </div>
      </Modal>

      {/* VIEW MODAL */}
      <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#c5a37e]/10 flex items-center justify-center">
                <Eye size={15} className="text-[#c5a37e]" />
              </div>
              <h3 className="font-semibold text-gray-800">Category Details</h3>
            </div>
            <button
              onClick={() => setViewOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {selected && (
            <div className="space-y-4">
              {/* icon + name */}
              <div className="flex items-center gap-4 p-4 bg-[#c5a37e]/5 rounded-xl border border-[#c5a37e]/10">
                <div className="w-12 h-12 rounded-xl bg-[#c5a37e]/15 flex items-center justify-center shrink-0">
                  <Tag size={22} className="text-[#c5a37e]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {selected.name}
                  </p>
                  <span className="font-mono text-xs text-gray-400">
                    {selected.slug}
                  </span>
                </div>
              </div>

              {/* detail rows */}
              {[
                { label: "Collection", value: collectionName(selected) },
                { label: "Status", value: selected.status },
                {
                  label: "Created",
                  value: new Date(selected.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  ),
                },
                { label: "ID", value: selected._id, mono: true },
              ].map(({ label, value, mono }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-gray-500">{label}</span>
                  {label === "Status" ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        value === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    <span
                      className={`text-sm font-medium text-gray-700 ${mono ? "font-mono text-xs text-gray-400" : ""}`}
                    >
                      {value}
                    </span>
                  )}
                </div>
              ))}

              {/* quick actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setViewOpen(false);
                    openEdit(selected);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 cursor-pointer transition"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    setViewOpen(false);
                    openDelete(selected._id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm border border-red-200 text-red-500 rounded-xl hover:bg-red-50 cursor-pointer transition"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete Category"
        message="This category will be permanently removed. This action cannot be undone."
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />

      {/* SUCCESS MODAL */}
      <SuccessModal
        open={successOpen}
        message={successMsg}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
}
