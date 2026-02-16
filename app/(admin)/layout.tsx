"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, Menu } from "lucide-react";
import Sidebar from "@/app/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth");

    if (pathname === "/login-admin") {
      setIsAuthorized(true);
      return;
    }

    if (!isLoggedIn) {
      router.push("/login-admin");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  if (pathname === "/login-admin") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
        {/* Top bar (fixed height) */}
        <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
          {/* Mobile menu */}
          <button
            className="md:hidden mr-4"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Collapse toggle (desktop) */}
          <button
            className="hidden md:block text-md border-2 cursor-pointer px-3 py-1 bg-white/5 rounded-lg hover:bg-[#c5a37e] hover:text-black transition"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? ">" : "<"}
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>
    </div>
  );
}
