export function AboutStory() {
  return (
    <section className="py-24 bg-bg">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/about/workshop.jpg"
          alt="Our workspace"
          className="rounded-2xl border border-border object-cover"
        />

        <div>
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted">
            Global Technologies was founded with a simple belief — elevator
            systems demand precision, reliability, and genuine components.
            Delays or compromises in quality directly impact safety and
            performance.
          </p>

          <p className="mt-4 text-muted">
            Over the years, we’ve partnered with leading manufacturers and
            supported a wide range of industries by supplying certified elevator
            spare parts that technicians can trust on-site.
          </p>
        </div>
      </div>
    </section>
  );
}
