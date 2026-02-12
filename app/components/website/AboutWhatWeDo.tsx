export function AboutWhatWeDo() {
  return (
    <section className="py-24 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center">What We Do</h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Genuine Elevator Spare Parts",
            "Authorized Brand Distribution",
            "Bulk & Project Supply",
            "Technical Product Support",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl p-6"
            >
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-3 text-sm text-muted">
                Reliable sourcing backed by industry partnerships and practical
                experience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
