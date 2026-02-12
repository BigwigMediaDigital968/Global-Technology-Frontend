export function ContactInfo() {
  return (
    <section className="py-16 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3 text-center">
        <div>
          <h4 className="font-semibold">Call Us</h4>
          <p className="text-muted mt-2">+91 XXXXX XXXXX</p>
        </div>
        <div>
          <h4 className="font-semibold">Email</h4>
          <p className="text-muted mt-2">sales@globaltechnologies.in</p>
        </div>
        <div>
          <h4 className="font-semibold">Business Hours</h4>
          <p className="text-muted mt-2">Mon – Sat | 10 AM – 7 PM</p>
        </div>
      </div>
    </section>
  );
}
