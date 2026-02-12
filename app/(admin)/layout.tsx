"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Loader2,
  LayoutDashboard,
  Users,
  Package,
  Library,
  Mail,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Sync activePage with pathname
  useEffect(() => {
    if (pathname.includes("/admin-dashboard")) {
      setActivePage("dashboard");
    } else if (pathname.includes("/products")) {
      setActivePage(pathname.includes("/add") ? "addProduct" : "productList");
      setOpenMenu("products");
    } else if (pathname.includes("/leads")) {
      setActivePage("leads");
    } else if (pathname.includes("/collection")) {
      setActivePage(
        pathname.includes("/create") ? "createCollection" : "collectionList",
      );
      setOpenMenu("collection");
    } else if (pathname.includes("/newsletter")) {
      setActivePage(
        pathname.includes("/send-email") ? "sendEmail" : "emailList",
      );
      setOpenMenu("newsletter");
    }
  }, [pathname]);

  // 🔐 Protect Admin Panel
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("adminAuth");

      if (pathname === "/login-admin") {
        if (isLoggedIn) {
          router.push("/admin-dashboard");
        } else {
          setIsAuthorized(true);
        }
        return;
      }

      if (!isLoggedIn) {
        setIsAuthorized(false);
        router.push("/login-admin");
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthorized(false);
    router.push("/login-admin");
  };

  const dropdownAnimation = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  // Prevent flash: show nothing or a loader while checking auth
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  // If not authorized and not on login page, we are being redirected
  if (!isAuthorized && pathname !== "/login-admin") {
    return null;
  }

  // If we are on login page, don't show the sidebar
  if (pathname === "/login-admin") {
    return <>{children}</>;
  }

  const navigate = (path: string, page: string) => {
    setActivePage(page);
    router.push(path);
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <h1 className="text-3xl font-bold">Dashboard</h1>;
      case "productList":
        return <h1 className="text-3xl font-bold">Product List</h1>;
      case "addProduct":
        return <h1 className="text-3xl font-bold">Add Product</h1>;
      case "leads":
        return <h1 className="text-3xl font-bold">Leads</h1>;
      case "collectionList":
        return <h1 className="text-3xl font-bold">Collection List</h1>;
      case "createCollection":
        return <h1 className="text-3xl font-bold">Create Collection</h1>;
      case "emailList":
        return <h1 className="text-3xl font-bold">Email List</h1>;
      case "sendEmail":
        return <h1 className="text-3xl font-bold">Send Email</h1>;
      default:
        return <h1>Dashboard</h1>;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-[280px] h-screen sticky top-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
        <div className="p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center mb-4">
            <span className="text-4xl font-serif">GT</span>
          </div>
          <h2 className="text-2xl font-bold tracking-widest uppercase"> </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin-dashboard", "dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activePage === "dashboard"
                ? "bg-[#c5a37e] text-black font-bold shadow-lg"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          {/* Products */}
          <div>
            <button
              onClick={() => toggleMenu("products")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname.includes("/products-list") && activePage !== "leads"
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span>Products</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openMenu === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === "products" && (
                <motion.div
                  variants={dropdownAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-9 mt-1 space-y-1 overflow-hidden"
                >
                  <button
                    onClick={() => navigate("/products-list", "productList")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "productList"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Product List
                  </button>
                  <button
                    onClick={() => navigate("/products/add", "addProduct")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "addProduct"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Add New Product
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Leads */}
          <button
            onClick={() => navigate("/leads", "leads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activePage === "leads"
                ? "bg-[#c5a37e] text-black font-bold shadow-lg"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Users size={20} />
            <span>Leads</span>
          </button>

          {/* Collection */}
          <div>
            <button
              onClick={() => toggleMenu("collection")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname.includes("/collection")
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Library size={20} />
                <span>Collection</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openMenu === "collection" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === "collection" && (
                <motion.div
                  variants={dropdownAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-9 mt-1 space-y-1 overflow-hidden"
                >
                  <button
                    onClick={() => navigate("/collection", "collectionList")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "collectionList"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Collection List
                  </button>
                  <button
                    onClick={() =>
                      navigate("/collection/create", "createCollection")
                    }
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "createCollection"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Create Collection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Newsletter */}
          <div>
            <button
              onClick={() => toggleMenu("newsletter")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname.includes("/newsletter")
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span>Newsletter</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openMenu === "newsletter" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === "newsletter" && (
                <motion.div
                  variants={dropdownAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="ml-9 mt-1 space-y-1 overflow-hidden"
                >
                  <button
                    onClick={() => navigate("/newsletter", "emailList")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "emailList"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Email List
                  </button>
                  <button
                    onClick={() =>
                      navigate("/newsletter/send-email", "sendEmail")
                    }
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activePage === "sendEmail"
                        ? "text-[#c5a37e] font-bold"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Send Email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-[#050505] overflow-hidden">
        <div className="h-screen overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
