import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text">
        <div className="flex min-h-screen">
          <aside className="w-64 border-r border-border p-6">
            <h2 className="font-bold text-lg">
              Global <span className="text-accent">Admin</span>
            </h2>

            <nav className="mt-10 space-y-4 text-sm text-muted">
              <a href="/admin/dashboard" className="block hover:text-text">
                Dashboard
              </a>
              <a href="/admin/leads" className="block hover:text-text">
                Leads
              </a>
              <a href="/admin/cms" className="block hover:text-text">
                CMS
              </a>
            </nav>
          </aside>

          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
