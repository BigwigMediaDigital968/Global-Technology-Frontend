"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CHECK_ICON = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path
      d="M2 6.5L4.5 9L10 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProductInfo({ product }: { product: any }) {
  const router = useRouter();

  // Pull bullet features from extraDetails or use defaults
  const features = product.extraDetails
    ? Object.values(product.extraDetails as Record<string, string>).slice(0, 4)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-5 pt-1"
    >
      {/* Category pill */}
      <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        {product.collectionName?.name}
      </span>

      <h1 className="text-2xl font-semibold leading-snug">{product.name}</h1>

      {product.shortDescription && (
        <p className="text-sm text-muted leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      {/* Features */}
      {features.length > 0 && (
        <ul className="flex flex-col gap-2">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-sm text-muted"
            >
              <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
                {CHECK_ICON}
              </span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Request Quote */}
        <button
          onClick={() =>
            router.push(`/user-login?redirect=/products/${product.slug}`)
          }
          className="w-full py-3 rounded-lg cursor-pointer bg-amber-200 text-black border border-amber-200/40 text-sm font-medium hover:bg-amber-300 transition"
        >
          Request Quote
        </button>

        {/* Download Catalogue */}
        <a
          href={`${product.file}#toolbar=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-3 cursor-pointer rounded-lg border border-border text-sm hover:bg-white/5 transition"
        >
          Download Catalogue
        </a>
      </div>
    </motion.div>
  );
}
