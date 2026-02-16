import CollectionDetail from "./CollectionDetail";

/* ---------------------------------------------
   SERVER-SIDE DATA (API later)
--------------------------------------------- */
const collection = {
  name: "Elevator Control Panels",
  description:
    "High-performance elevator control panels engineered for safety, reliability, and seamless operation.",
  banner: "/images/collections/control-panels.jpg",
  highlights: [
    "Advanced Microcontroller Based",
    "Energy Efficient Design",
    "Supports VVVF & Gearless Systems",
    "Compliant with Safety Standards",
  ],
};

const products = [
  {
    id: 1,
    name: "Smart Lift Control Panel",
    image: "/images/products/panel-1.jpg",
    slug: "smart-lift-control-panel",
  },
  {
    id: 2,
    name: "VVVF Elevator Panel",
    image: "/images/products/panel-2.jpg",
    slug: "vvvf-elevator-panel",
  },
  {
    id: 3,
    name: "MRL Control Panel",
    image: "/images/products/panel-3.jpg",
    slug: "mrl-control-panel",
  },
];

export default async function CollectionDetailPage() {
  /**
   * 🔜 Later:
   * const { collection, products } = await fetchCollection(slug)
   */

  return <CollectionDetail collection={collection} products={products} />;
}
