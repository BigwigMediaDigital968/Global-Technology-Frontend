import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import "../globals.css";
import SmoothScroll from "@/app/components/shared/SmoothScroll";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SmoothScroll />
        {children}
        <Footer />
      </body>
    </html>
  );
}
