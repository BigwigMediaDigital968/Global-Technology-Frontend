export default function Footer() {
  return (
    <footer className="bg-[#05080d] border-t border-amber-100/50">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold">
            Global <span className="text-accent">Technologies</span>
          </h3>
          <p className="mt-4 text-sm text-muted">
            Trusted manufacturer & supplier of premium elevator spare parts
            across India.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-4 font-semibold">Categories</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>Control Panels</li>
            <li>Door Operators</li>
            <li>Traction Machines</li>
            <li>Safety Components</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-4 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>About Us</li>
            <li>Industries</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="mb-4 font-semibold">Policies</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-100/50 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Global Technologies. All rights reserved.
      </div>
    </footer>
  );
}
