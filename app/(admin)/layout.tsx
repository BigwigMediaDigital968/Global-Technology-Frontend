import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Login | Global Technologies",
  description: "Secure login for Global Technologies Admin Panel",
};

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
