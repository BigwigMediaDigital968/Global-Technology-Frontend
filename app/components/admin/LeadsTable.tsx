"use client";

import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  requirements: string;
  budget: string;
  requestedAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function LeadsTable({ leads, onDelete, isLoading }: LeadsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = leads.slice(startIndex, startIndex + itemsPerPage);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gt-card rounded-xl border border-gt-border">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gt-accent"></div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gt-card rounded-xl border border-gt-border">
        <p className="text-gt-muted">No leads found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-sm font-bold bg-[#0a0a0a] text-white border-b border-white/10 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Name</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Email</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Phone</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Requirements</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Budget</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap">Requested At</th>
              <th scope="col" className="px-6 py-5 whitespace-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-white/5">
            {paginatedLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-medium whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${lead.email}`} className="text-[#00d2ff] hover:underline transition-colors">
                    {lead.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                <td className="px-6 py-4 max-w-xs truncate" title={lead.requirements}>
                  {lead.requirements}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.budget}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                  {formatDateTime(lead.requestedAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded bg-transparent border-white/20 text-[#c5a37e] focus:ring-0 focus:ring-offset-0"
                    />
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="text-red-600 hover:text-red-500 transition-colors p-1"
                      title="Delete lead"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gt-muted">
            Showing <span className="text-gt-text font-medium">{startIndex + 1}</span> to{" "}
            <span className="text-gt-text font-medium">
              {Math.min(startIndex + itemsPerPage, leads.length)}
            </span>{" "}
            of <span className="text-gt-text font-medium">{leads.length}</span> leads
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gt-border bg-gt-card text-gt-text hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg border transition-all ${
                    currentPage === i + 1
                      ? "bg-gt-accent border-gt-accent text-gt-primary font-bold"
                      : "border-gt-border bg-gt-card text-gt-text hover:bg-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gt-border bg-gt-card text-gt-text hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
