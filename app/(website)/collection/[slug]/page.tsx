import CollectionDetail from "./CollectionDetail";

const API = process.env.NEXT_PUBLIC_BASE_URI;

async function getCollection(slug: string) {
  const url = `${API}/api/collections/${slug}`;
  console.log("Fetching:", url);

  try {
    const res = await fetch(url, { cache: "no-store" });
    console.log("Response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log("Error body:", text);
      throw new Error(`${res.status}: ${text}`);
    }

    const json = await res.json();
    console.log("Response data:", JSON.stringify(json, null, 2));
    return json;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Next.js 15 requires awaiting params
}) {
  const { slug } = await params; // ✅ await params
  console.log("Slug:", slug);

  const response = await getCollection(slug);
  const data = response.data;

  const collection = {
    name: data?.name || "",
    description: data?.description || "",
    image: data?.image || "/images/placeholder.jpg",
    highlights: [
      "Industry Trusted Brand",
      "Certified Elevator Components",
      "Reliable Performance",
      "Compatible With Modern Lift Systems",
    ],
  };

  const products =
    data?.products?.map((p: any) => ({
      id: p._id,
      name: p.name,
      images: p.images?.length ? p.images : [data.image],
      slug: p.slug,
    })) || [];

  return <CollectionDetail collection={collection} products={products} />;
}
