import { useRouter } from "next/navigation";

export function AboutCTA() {
  const router = useRouter();

  return (
    <section className="py-24 bg-bg text-center">
      <h2 className="text-3xl font-bold">
        Let’s Build Reliable Systems Together
      </h2>
      <p className="mt-4 text-muted">
        Whether you need technical guidance or bulk supply, our team is here.
      </p>

      <button
        onClick={() => router.push("/contact")}
        className="mt-8 rounded-md bg-accent border-2 cursor-pointer px-10 py-4 font-semibold text-bg shadow-glow hover:scale-105 transition"
      >
        Contact Global Technologies
      </button>
    </section>
  );
}
