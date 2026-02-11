"use client";

import { useState, useEffect } from "react";
import LeadsTable, { Lead } from "@/app/components/admin/LeadsTable";
import DateFilter from "@/app/components/admin/DateFilter";

// Mock Data
const mockData: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    requirements: "Need a custom enterprise software solution for supply chain management.",
    budget: "$5,000 - $10,000",
    requestedAt: "2026-02-10T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@techcorp.com",
    phone: "+44 7700 900123",
    requirements: "Looking for a mobile app development team for a fintech startup.",
    budget: "$15,000 - $25,000",
    requestedAt: "2026-02-11T14:20:00Z",
  },
  {
    id: "3",
    name: "Robert Brown",
    email: "robert.b@global.net",
    phone: "+91 98765 43210",
    requirements: "Cloud migration and infrastructure setup for a growing e-commerce platform.",
    budget: "$8,000 - $12,000",
    requestedAt: "2026-02-09T09:15:00Z",
  },
  {
    id: "4",
    name: "Alice Wilson",
    email: "alice@startup.io",
    phone: "+61 412 345 678",
    requirements: "AI/ML integration for customer support automation.",
    budget: "$20,000+",
    requestedAt: "2026-02-11T11:45:00Z",
  },
  {
    id: "5",
    name: "Michael Chen",
    email: "m.chen@asiatech.com",
    phone: "+852 2123 4567",
    requirements: "UI/UX redesign for an existing SaaS product.",
    budget: "$3,000 - $5,000",
    requestedAt: "2026-02-10T16:50:00Z",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    email: "sarah.j@innovate.com",
    phone: "+1 555 010 999",
    requirements: "Full-stack development for a social networking platform.",
    budget: "$10,000 - $15,000",
    requestedAt: "2026-02-08T13:10:00Z",
  },
  {
    id: "7",
    name: "David Lee",
    email: "david.lee@webdev.co",
    phone: "+65 6789 0123",
    requirements: "SEO and digital marketing services for a local business.",
    budget: "$1,000 - $2,500",
    requestedAt: "2026-02-11T08:30:00Z",
  },
  {
    id: "8",
    name: "Emily Davis",
    email: "emily.d@designs.com",
    phone: "+1 888 777 666",
    requirements: "WordPress theme customization and plugin development.",
    budget: "$2,000 - $4,000",
    requestedAt: "2026-02-10T12:00:00Z",
  },
  {
    id: "9",
    name: "Tom Harris",
    email: "tom.h@security.net",
    phone: "+49 30 123456",
    requirements: "Cybersecurity audit and penetration testing for a banking application.",
    budget: "$12,000 - $18,000",
    requestedAt: "2026-02-09T15:40:00Z",
  },
  {
    id: "10",
    name: "Lisa Wong",
    email: "lisa.w@retail.com",
    phone: "+81 3 1234 5678",
    requirements: "Inventory management system with barcode scanning integration.",
    budget: "$7,000 - $10,000",
    requestedAt: "2026-02-11T17:25:00Z",
  },
  {
    id: "11",
    name: "James Wilson",
    email: "james@future.tech",
    phone: "+1 444 333 222",
    requirements: "Blockchain development for a supply chain transparency project.",
    budget: "$25,000+",
    requestedAt: "2026-02-11T10:00:00Z",
  }
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  async function getLeads() {
    setLoading(true);
    // TODO: Replace with real API endpoint
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLeads(mockData);
    setFilteredLeads(mockData);
    setLoading(false);
  }

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = leads.filter((lead) => {
        const leadDate = new Date(lead.requestedAt).toISOString().split("T")[0];
        return leadDate === selectedDate;
      });
      setFilteredLeads(filtered);
    } else {
      setFilteredLeads(leads);
    }
  }, [selectedDate, leads]);

  const handleDelete = (id: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
    // Also update filtered leads in case a filter is active
    setFilteredLeads(filteredLeads.filter((lead) => lead.id !== id));
  };

  return (
    <div className="min-h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#050505] pt-8 px-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold tracking-tight">Leads</h1>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Filter by Date:</span>
              <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate("")}
                  className="text-xs text-[#c5a37e] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <hr className="border-white/10" />
        </div>
      </div>

      {/* Table Section */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <LeadsTable 
              leads={filteredLeads} 
              onDelete={handleDelete} 
              isLoading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
