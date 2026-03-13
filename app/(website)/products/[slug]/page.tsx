import ProductDetailPage from "./ProductDetailPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params; // ← await params

  const res = await fetch(`${process.env.BASE_URI}/api/products/${slug}`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log(data);

  if (!data.success || !data.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Product not found.
      </div>
    );
  }

  return <ProductDetailPage product={data.data} />;
}
