"use client";

import { useState, useEffect, useRef } from "react";
import { useModal } from "@/app/Context/ModalContext";

export default function SendEmailPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            content,
            emails: selectedEmails,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showModal("success", "Email Sent", data.message);

      setSubject("");
      setContent("");
      setSelectedEmails([]);
    } catch (err: any) {
      showModal("error", "Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold">Send Bulk Newsletter</h1>

      {/* ================= Dropdown ================= */}
      <div className="relative" ref={dropdownRef}>
        <label className="block mb-2 font-medium">
          Select Active Subscribers
        </label>

        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border p-4 rounded-xl cursor-pointer"
        >
          {selectedEmails.length === 0
            ? "Select subscribers..."
            : `${selectedEmails.length} selected`}
        </div>

        {openDropdown && (
          <div className="absolute z-50 mt-2 w-full bg-amber-100 text-black border rounded-xl shadow-lg max-h-60 overflow-y-auto p-4 space-y-2">
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-sm text-green-600 cursor-pointer"
              >
                Select All
              </button>

              <button
                type="button"
                onClick={clearSelection}
                className="text-sm text-red-600 cursor-pointer"
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
          className="w-full p-4 border rounded-xl"
          required
        />

        <textarea
          placeholder="Email HTML Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-4 border rounded-xl"
          required
        />

        <button
          disabled={loading}
          className="px-6 py-3 cursor-pointer rounded-xl border-2 bg-amber-200 text-black"
        >
          {loading ? "Sending..." : `Send to ${selectedEmails.length} Selected`}
        </button>
      </form>
    </div>
  );
}
