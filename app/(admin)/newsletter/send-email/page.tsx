"use client";

import { useState, useEffect, useRef } from "react";
import { useModal } from "@/app/Context/ModalContext";
import EmailTemplateBuilder from "@/app/components/shared/EmailTemplateBuilder";

interface UploadFile {
  file: File;
  progress: number;
  preview?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB

export default function SendEmailPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [attachments, setAttachments] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showModal } = useModal();

  /* =============================
     Fetch Active Subscribers
  ============================== */
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/all`,
        );
        const data = await res.json();

        const activeUsers =
          data.data?.filter((user: any) => user.status === "active") || [];

        setSubscribers(activeUsers);
      } catch {
        showModal("error", "Error", "Failed to load subscribers");
      }
    };

    fetchSubscribers();
  }, []);

  /* =============================
     Close dropdown on outside click
  ============================== */
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =============================
     Drag & Drop Handling
  ============================== */
  const addFiles = (files: FileList) => {
    let totalSize = attachments.reduce((acc, f) => acc + f.file.size, 0);

    const newFiles: UploadFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        showModal("error", "File Too Large", `${file.name} exceeds 10MB`);
        return;
      }

      totalSize += file.size;

      if (totalSize > MAX_TOTAL_SIZE) {
        showModal("error", "Total Size Exceeded", "Max total 20MB allowed");
        return;
      }

      const preview =
        file.type.startsWith("image/") || file.type === "application/pdf"
          ? URL.createObjectURL(file)
          : undefined;

      newFiles.push({
        file,
        progress: 0,
        preview,
      });
    });

    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) return "📄";
    if (file.type.includes("word")) return "📝";
    if (file.type.includes("excel")) return "📊";
    if (file.type.includes("zip")) return "🗜️";
    if (file.type.startsWith("image/")) return "🖼️";
    return "📎";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  /* =============================
     Selection Logic
  ============================== */
  const toggleEmail = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const selectAll = () => {
    const allEmails = subscribers.map((user) => user.email);
    setSelectedEmails(allEmails);
  };

  const clearSelection = () => {
    setSelectedEmails([]);
  };

  /* =============================
     Send Email
  ============================== */
  const sendBulkEmail = async (e: any) => {
    e.preventDefault();

    if (selectedEmails.length === 0) {
      return showModal(
        "error",
        "No Recipients",
        "Please select at least one email",
      );
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("content", content);
      formData.append("emails", JSON.stringify(selectedEmails));

      attachments.forEach((item) => {
        formData.append("attachments", item.file);
      });

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/send`,
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);

          setAttachments((prev) =>
            prev.map((file) => ({
              ...file,
              progress: percent,
            })),
          );
        }
      };

      xhr.onload = () => {
        setLoading(false);
        setUploadProgress(0);
        showModal("success", "Email Sent", "Newsletter sent successfully");
        setSubject("");
        setContent("");
        setAttachments([]);
        setSelectedEmails([]);
      };

      xhr.onerror = () => {
        setLoading(false);
        showModal("error", "Error", "Upload failed");
      };

      xhr.send(formData);
    } catch (err: any) {
      setLoading(false);
      showModal("error", "Failed", err.message);
    }
  };

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10 text-white">
      <h1 className="text-2xl font-bold">Send Bulk Newsletter</h1>

      {/* ================= Dropdown ================= */}
      <div className="relative" ref={dropdownRef}>
        <label className="block mb-2 font-medium">
          Select Active Subscribers
        </label>

        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border border-neutral-700 bg-[#111111] p-4 rounded-xl cursor-pointer"
        >
          {selectedEmails.length === 0
            ? "Select subscribers..."
            : `${selectedEmails.length} selected`}
        </div>

        {openDropdown && (
          <div className="absolute z-50 mt-2 w-full bg-[#111111] border border-neutral-700 rounded-xl shadow-lg max-h-60 overflow-y-auto p-4 space-y-2">
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-sm text-green-500"
              >
                Select All
              </button>

              <button
                type="button"
                onClick={clearSelection}
                className="text-sm text-red-500"
              >
                Clear
              </button>
            </div>

            {subscribers.map((user) => (
              <label
                key={user._id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(user.email)}
                  onChange={() => toggleEmail(user.email)}
                />
                <span>{user.email}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ================= Email Form ================= */}
      <form onSubmit={sendBulkEmail} className="space-y-6">
        <input
          type="text"
          placeholder="Email Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-4 border border-neutral-700 bg-[#111111] rounded-xl"
          required
        />

        <textarea
          placeholder="Email HTML Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-4 border border-neutral-700 bg-[#111111] rounded-xl"
          required
        />

        {/* <EmailTemplateBuilder value={content} onChange={setContent} /> */}

        {/* ================= Drag & Drop Upload ================= */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-neutral-600 rounded-xl p-6 text-center bg-[#111111] hover:border-amber-400 transition"
        >
          Drag & drop file here or{" "}
          <label className="text-amber-400 cursor-pointer underline">
            browse
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
              }}
            />
          </label>
        </div>

        {/* ================= File Preview ================= */}
        {attachments.length > 0 && (
          <div className="space-y-4">
            {attachments.map((item, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-neutral-700 p-4 rounded-xl"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Image Thumbnail */}
                    {item.file.type.startsWith("image/") && item.preview && (
                      <img
                        src={item.preview}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}

                    {/* PDF Inline Preview */}
                    {item.file.type === "application/pdf" && item.preview && (
                      <iframe
                        src={item.preview}
                        className="w-20 h-20 rounded border"
                      />
                    )}

                    {/* File Info */}
                    <div>
                      <p className="text-sm">
                        {getFileIcon(item.file)} {item.file.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {(item.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Per-file Progress */}
                {item.progress > 0 && (
                  <div className="mt-3 w-full bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= Upload Progress ================= */}
        {uploadProgress > 0 && (
          <div className="w-full bg-neutral-700 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* ================= Buttons ================= */}
        <div className="flex gap-4">
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-300 text-black font-semibold hover:bg-amber-400 transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : `Send to ${selectedEmails.length} Selected`}
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-6 py-3 rounded-xl border border-neutral-600"
          >
            Preview
          </button>
        </div>
      </form>

      {/* ================= Preview Modal ================= */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{subject}</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
