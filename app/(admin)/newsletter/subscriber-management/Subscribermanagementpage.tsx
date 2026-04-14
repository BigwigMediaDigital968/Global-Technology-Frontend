"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/app/Context/ModalContext";

interface Subscriber {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  unsubscribedAt?: string;
  unsubscribeReason?: string;
  createdAt: string;
}

type Tab = "active" | "unsubscribed";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function SubscriberManagementPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("active");
  const [search, setSearch] = useState("");
  const { showModal } = useModal();

  /* ── Fetch all subscribers ── */
  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/all`,
      );
      const data = await res.json();
      setSubscribers(data.data || []);
    } catch {
      showModal("error", "Error", "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  /* ── Filtered lists ── */
  const filtered = subscribers.filter((s) => {
    const matchTab = s.status === tab;
    const matchSearch = s.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const unsubCount = subscribers.filter(
    (s) => s.status === "unsubscribed",
  ).length;

  /* ── Copy email list ── */
  const copyEmails = () => {
    const emails = filtered.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
    showModal(
      "success",
      "Copied",
      `${filtered.length} emails copied to clipboard`,
    );
  };

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-8 text-white">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscribers</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your newsletter mailing list
          </p>
        </div>
        <button
          onClick={fetchSubscribers}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-sm text-neutral-300 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M12 7A5 5 0 112 7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M12 3v4H8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Subscribers",
            value: subscribers.length,
            color: "text-white",
          },
          { label: "Active", value: activeCount, color: "text-green-400" },
          { label: "Unsubscribed", value: unsubCount, color: "text-red-400" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-[#111111] border border-neutral-800 rounded-xl p-5"
          >
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
              {label}
            </p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex bg-[#111111] border border-neutral-800 rounded-xl p-1 gap-1">
          {(["active", "unsubscribed"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer capitalize ${
                tab === t
                  ? "bg-amber-400 text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t === "active"
                ? `Active (${activeCount})`
                : `Unsubscribed (${unsubCount})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <div className="relative flex-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600"
            >
              <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line
                x1="9.5"
                y1="9.5"
                x2="13"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 bg-[#111111] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition"
            />
          </div>
          {filtered.length > 0 && (
            <button
              onClick={copyEmails}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-700 text-xs text-neutral-400 hover:border-amber-400 hover:text-amber-400 transition cursor-pointer whitespace-nowrap"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect
                  x="4"
                  y="4"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M1 8V2a1 1 0 011-1h6"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
              Copy {filtered.length}
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-spin text-amber-400"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="14 14"
                opacity="0.3"
              />
              <path
                d="M12 2a10 10 0 0110 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="text-neutral-800"
            >
              <rect
                x="6"
                y="6"
                width="28"
                height="28"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <path
                d="M14 20h12M20 14v12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-neutral-500">
              {search ? `No results for "${search}"` : `No ${tab} subscribers`}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  {tab === "active" ? "Subscribed On" : "Unsubscribed On"}
                </th>
                {tab === "unsubscribed" && (
                  <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Reason
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub, i) => (
                <tr
                  key={sub._id}
                  className={`border-b border-neutral-800/50 hover:bg-neutral-800/30 transition ${
                    i === filtered.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          sub.status === "active"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      />
                      <span className="text-sm text-white font-mono">
                        {sub.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md">
                      {sub.source || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-neutral-400">
                    {tab === "active"
                      ? formatDate(sub.createdAt)
                      : sub.unsubscribedAt
                        ? formatDate(sub.unsubscribedAt)
                        : "—"}
                  </td>
                  {tab === "unsubscribed" && (
                    <td className="px-5 py-3.5 text-sm text-neutral-500 max-w-xs truncate">
                      {sub.unsubscribeReason || "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Footer note ── */}
      <p className="text-xs text-neutral-700 text-center">
        Unsubscribed users are excluded automatically when sending newsletters.
        Their data is retained for compliance purposes.
      </p>
    </div>
  );
}
