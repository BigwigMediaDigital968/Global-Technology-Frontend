"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  Package,
  Library,
  Mail,
  LogOut,
  Tag,
} from "lucide-react";

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /* =============================
     Auto open dropdown based on route
  ============================== */
  useEffect(() => {
    if (pathname.startsWith("/products-list")) setOpenMenu("products");
    else if (pathname.startsWith("/collection-list"))
      setOpenMenu("collection-list");
    else if (pathname.startsWith("/newsletter")) setOpenMenu("newsletter");
    else setOpenMenu(null);
  }, [pathname]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const NavButton = ({ icon, label, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
        ${
          active
            ? "bg-[#c5a37e] text-black font-bold"
            : "text-gray-400 hover:text-white"
        }
      `}
    >
      <span className="group-hover:text-[#fff] transition">{icon}</span>

      {!collapsed && (
        <span className="relative">
          {label}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#c5a37e] transition-all duration-300 group-hover:w-full"></span>
        </span>
      )}
    </button>
  );

  const Dropdown = ({ menu, children }: any) => (
    <AnimatePresence>
      {openMenu === menu && !collapsed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-8 overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const sidebarContent = (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col
        ${collapsed ? "w-[90px]" : "w-[260px]"}
      `}
    >
      {/* Logo */}
      <div className="p-6 flex justify-center">
        <div className="w-16 h-16 rounded-full border border-[#c5a37e]/40 flex items-center justify-center">
          <span className="text-xl font-bold text-[#c5a37e]">GT</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {/* Dashboard */}
        <NavButton
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={pathname === "/admin-dashboard"}
          onClick={() => router.push("/admin-dashboard")}
        />

        {/* Leads */}
        <NavButton
          icon={<Users size={20} />}
          label="Leads"
          active={pathname.includes("/leads")}
          onClick={() => router.push("/leads")}
        />

        {/* Leads */}
        <NavButton
          icon={<Tag size={20} />}
          label="Category"
          active={pathname.includes("/category-management")}
          onClick={() => router.push("/category-management")}
        />

        {/* Collection */}
        <div>
          <NavButton
            icon={<Library size={20} />}
            label="Collection"
            active={pathname.startsWith("/collection-list")}
            onClick={() => toggleMenu("collection-list")}
          />
          <Dropdown menu="collection-list">
            <SubItem
              label="Collection List"
              active={pathname === "/collection-list"}
              onClick={() => router.push("/collection-list")}
            />
            <SubItem
              label="Create Collection"
              active={pathname === "/collection-list/create"}
              onClick={() => router.push("/collection-list/create")}
            />
          </Dropdown>
        </div>

        {/* Products */}
        <div>
          <NavButton
            icon={<Package size={20} />}
            label="Products"
            active={pathname.startsWith("/products-list")}
            onClick={() => toggleMenu("products")}
          />
          <Dropdown menu="products">
            <SubItem
              label="Product List"
              active={pathname === "/products-list"}
              onClick={() => router.push("/products-list")}
            />
            <SubItem
              label="Add Product"
              active={pathname === "/products-list/add"}
              onClick={() => router.push("/products-list/add")}
            />
          </Dropdown>
        </div>

        {/* Newsletter */}
        <div>
          <NavButton
            icon={<Mail size={20} />}
            label="Newsletter"
            active={pathname.startsWith("/newsletter")}
            onClick={() => toggleMenu("newsletter")}
          />
          <Dropdown menu="newsletter">
            <SubItem
              label="Email List"
              active={pathname === "/newsletter"}
              onClick={() => router.push("/newsletter")}
            />
            <SubItem
              label="Send Email"
              active={pathname.includes("/newsletter/send-email")}
              onClick={() => router.push("/newsletter/send-email")}
            />
          </Dropdown>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            router.push("/login-admin");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">{sidebarContent}</div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed z-50"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =============================
   Sub Item
============================== */
function SubItem({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all cursor-pointer
        ${
          active ? "text-[#c5a37e] font-bold" : "text-gray-500 hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}
