import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import SmoothScroll from "@/app/components/shared/SmoothScroll";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SmoothScroll />
      {children}
      <Footer />
    </>
  );
}
