"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import ConfirmModal from "@/app/components/shared/ConfirmModal";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isVerified: boolean;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [actionType, setActionType] = useState<"delete" | "verify" | null>(
    null,
  );

  const base = process.env.NEXT_PUBLIC_BASE_URI;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${base}/api/lead/get-lead`);
        const data = await res.json();
        if (res.ok) setLeads(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  /* =============================
     Confirmed Action
  ============================== */
  const handleConfirm = async () => {
    if (!selectedLead || !actionType) return;

    if (actionType === "delete") {
      await fetch(`${base}/api/lead/delete-lead/${selectedLead._id}`, {
        method: "DELETE",
      });

      setLeads(leads.filter((l) => l._id !== selectedLead._id));
    }

    if (actionType === "verify") {
      await fetch(`${base}/api/lead/update-lead/${selectedLead._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isVerified: !selectedLead.isVerified,
        }),
      });

      setLeads((prev) =>
        prev.map((l) =>
          l._id === selectedLead._id ? { ...l, isVerified: !l.isVerified } : l,
        ),
      );
    }

    setSelectedLead(null);
    setActionType(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-white">
        Loading leads...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lead Management</h1>

      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-black border-b border-white/5">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Verified</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.phone}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.isVerified
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {lead.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setActionType("verify");
                      }}
                      className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setActionType("delete");
                      }}
                      className="text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!selectedLead}
        title={
          actionType === "delete" ? "Delete Lead" : "Change Verification Status"
        }
        message={
          actionType === "delete"
            ? "Are you sure you want to permanently delete this lead?"
            : "Are you sure you want to change verification status?"
        }
        confirmText={actionType === "delete" ? "Delete" : "Yes, Change"}
        danger={actionType === "delete"}
        onConfirm={handleConfirm}
        onCancel={() => {
          setSelectedLead(null);
          setActionType(null);
        }}
      />
    </div>
  );
}
