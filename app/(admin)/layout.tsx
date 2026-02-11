"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

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
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 p-6">
        <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-4 text-sm">

          {/* Dashboard */}
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "dashboard"
                ? "bg-white text-black font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>

          {/* Products */}
          <div>
            <button
              onClick={() => toggleMenu("products")}
              className="flex justify-between items-center w-full px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <span>Products</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
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
                  className="ml-4 mt-2 space-y-2"
                >
                  <button
                    onClick={() => setActivePage("productList")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "productList"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
                    }`}
                  >
                    Product List
                  </button>

                  <button
                    onClick={() => setActivePage("addProduct")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "addProduct"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
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
            onClick={() => setActivePage("leads")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "leads"
                ? "bg-white text-black font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            Leads
          </button>

          {/* Collection */}
          <div>
            <button
              onClick={() => toggleMenu("collection")}
              className="flex justify-between items-center w-full px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <span>Collection</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
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
                  className="ml-4 mt-2 space-y-2"
                >
                  <button
                    onClick={() => setActivePage("collectionList")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "collectionList"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
                    }`}
                  >
                    Collection List
                  </button>

                  <button
                    onClick={() => setActivePage("createCollection")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "createCollection"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
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
              className="flex justify-between items-center w-full px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <span>Newsletter</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
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
                  className="ml-4 mt-2 space-y-2"
                >
                  <button
                    onClick={() => setActivePage("emailList")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "emailList"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
                    }`}
                  >
                    Email List
                  </button>

                  <button
                    onClick={() => setActivePage("sendEmail")}
                    className={`block w-full text-left px-3 py-1.5 rounded ${
                      activePage === "sendEmail"
                        ? "bg-white text-black"
                        : "hover:bg-white/5"
                    }`}
                  >
                    Send Email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Logout
          </button>

        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10">
        {activePage === "dashboard" ? children : renderContent()}
      </main>
    </div>
  );
}
