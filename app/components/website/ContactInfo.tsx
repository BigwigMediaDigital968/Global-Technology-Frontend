export function ContactInfo() {
  return (
    <section className="py-16 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3 text-center">
        {/* 📞 Call Us */}
        <div>
          <h4 className="font-semibold mb-4">Call Us</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 border">
            {[
              "+917290079120",
              "+917290079121",
              "+917290079122",
              "+917290079123",
              "+918750068007",
              "+918750068008",
            ].map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="text-muted transition hover:underline hover:text-amber-200 underline-offset-4 "
              >
                {phone.replace("+91", "+91 ")}
              </a>
            ))}
          </div>
        </div>

        {/* ✉️ Email */}
        <div>
          <h4 className="font-semibold">Email</h4>
          <a
            href="mailto:sales@globaltechnologies.in"
            className="mt-2 block text-muted transition hover:text-amber-200 hover:underline underline-offset-4"
          >
            sales@globaltechnologies.in
          </a>
        </div>

        {/* 🕒 Business Hours */}
        <div>
          <h4 className="font-semibold">Business Hours</h4>
          <p className="text-muted mt-2">Mon – Sat | 10 AM – 7 PM</p>
        </div>
      </div>
    </section>
  );
}
