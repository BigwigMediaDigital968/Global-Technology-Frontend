"use client";

import { useState, useEffect } from "react";
import ProductHero from "@/app/components/website/ProductHero";
import ProductFilter from "@/app/components/website/ProductFilter";
import ProductGrid from "@/app/components/website/ProductGrid";
import ProductPageCTA from "@/app/components/website/ProductPageCTA";
import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";
import { Product } from "../../types/product";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URI;

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Collection {
  _id: string;
  name: string;
  slug: string;
  categories: Category[];
}

export default function ProductsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ── 1. Load collections (with embedded categories) once
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/collections`);
        const json = await res.json();
        const data: Collection[] = json.data || [];
        setCollections(data);
        // Auto-select first collection
        if (data.length > 0) setActiveCollection(data[0]);
      } catch (err) {
        console.error("Failed to load collections", err);
      }
    };
    fetchCollections();
  }, []);

  // ── 2. Fetch products whenever collection or category changes
  useEffect(() => {
    if (!activeCollection) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams({ collection: activeCollection.slug });

        if (activeCategory !== "All") {
          const cat = activeCollection.categories.find(
            (c) => c.name === activeCategory,
          );
          if (cat) qs.set("category", cat.slug);
        }

        const res = await fetch(`${API_BASE}/api/products?${qs.toString()}`);
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCollection, activeCategory]);

  const handleCollectionChange = (col: Collection) => {
    setActiveCollection(col);
    setActiveCategory("All"); // reset category on collection switch
  };

  const categoryNames = activeCollection
    ? ["All", ...activeCollection.categories.map((c) => c.name)]
    : ["All"];

  return (
    <>
      <ProductHero />

      {/* Collection Tabs */}
      <CollectionTabs
        collections={collections}
        active={activeCollection}
        onChange={handleCollectionChange}
      />

      {/* Category Filter — only shows when a collection is selected */}
      {activeCollection && categoryNames.length > 1 && (
        <ProductFilter
          categories={categoryNames}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      <ProductGrid products={products} loading={loading} />

      <AuthorizedPartners />
      <ProductPageCTA />
    </>
  );
}

/* ─────────────────────────────────────────────
   Collection Tabs sub-component
───────────────────────────────────────────── */
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollectionTabsProps {
  collections: Collection[];
  active: Collection | null;
  onChange: (col: Collection) => void;
}

function CollectionTabs({
  collections,
  active,
  onChange,
}: CollectionTabsProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!collections.length) return null;

  return (
    <div className="bg-bg border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-5">
        {/* Desktop: horizontal pill tabs */}
        <div className="hidden md:flex gap-3 flex-wrap justify-center">
          {collections.map((col) => (
            <motion.button
              key={col._id}
              onClick={() => onChange(col)}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition cursor-pointer ${
                active?._id === col._id
                  ? "bg-amber-200 text-black border border-amber-300"
                  : "border border-border text-muted hover:text-text hover:border-text/30"
              }`}
            >
              {col.name}
            </motion.button>
          ))}
        </div>

        {/* Mobile: dropdown */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between rounded-xl px-4 py-3 border border-border bg-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted uppercase tracking-widest">
                Collection
              </span>
              <span className="text-sm font-semibold">
                {active?.name ?? "Select"}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {mobileOpen && (
            <div className="mt-2 rounded-xl border border-border bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden">
              {collections.map((col) => (
                <button
                  key={col._id}
                  onClick={() => {
                    onChange(col);
                    setMobileOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-sm text-left transition ${
                    active?._id === col._id
                      ? "bg-amber-200 text-black"
                      : "hover:bg-white/10"
                  }`}
                >
                  {col.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
