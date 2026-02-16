"use client";

import { useEffect, useState } from "react";
import { Package, Users, Library, Mail } from "lucide-react";

interface Stats {
  products: number;
  leads: number;
  collections: number;
  subscribers: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    leads: 0,
    collections: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_URI;

        const results = await Promise.allSettled([
          fetch(`${base}/api/products`).then((res) => res.json()),
          fetch(`${base}/api/lead/get-lead`).then((res) => res.json()),
          fetch(`${base}/api/collection`).then((res) => res.json()),
          fetch(`${base}/api/newsletter/all`).then((res) => res.json()),
        ]);

        const safeGetLength = (result: any) => {
          if (result.status === "fulfilled") {
            return result.value?.data?.length || 0;
          }
          return 0;
        };

        setStats({
          products: safeGetLength(results[0]),
          leads: safeGetLength(results[1]),
          collections: safeGetLength(results[2]),
          subscribers: safeGetLength(results[3]),
        });
      } catch (err) {
        console.error("Unexpected dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Overview of platform activity
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Package size={22} />}
          label="Products"
          value={stats.products}
        />

        <StatCard
          icon={<Users size={22} />}
          label="Leads"
          value={stats.leads}
        />

        <StatCard
          icon={<Library size={22} />}
          label="Collections"
          value={stats.collections}
        />

        <StatCard
          icon={<Mail size={22} />}
          label="Subscribers"
          value={stats.subscribers}
        />
      </div>
    </div>
  );
}

/* =============================
   Stat Card
============================== */
function StatCard({ icon, label, value }: any) {
  return (
    <div className="relative backdrop-blur-xl bg-green-100 rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-[#9d5100]">{icon}</div>
        <span className="text-2xl font-bold text-[#9d5100]">{value}</span>
      </div>
      <p className="mt-4 text-[#9d5100] text-sm">{label}</p>
    </div>
  );
}
