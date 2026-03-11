import { useRouter } from "next/navigation";

export function IndustriesCTA() {
  const router = useRouter();

  return (
    <section className="py-24 md:pt-32 bg-bg text-center">
      <h2 className="text-3xl font-bold">
        Need Elevator Parts for Your Industry?
      </h2>
      <p className="mt-4 text-muted">
        Tell us your industry and requirements. Our experts will assist you.
      </p>

      <button
        onClick={() => router.push("/contact")}
        className="mt-8 rounded-md bg-accent border-2 cursor-pointer px-10 py-4 font-semibold text-bg shadow-glow hover:scale-105 hover:bg-amber-200 hover:text-black transition"
      >
        Get Industry-Specific Quote
      </button>
    </section>
  );
}
