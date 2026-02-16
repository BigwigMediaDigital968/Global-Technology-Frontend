import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import SmoothScroll from "@/app/components/shared/SmoothScroll";
import { ModalProvider } from "../Context/ModalContext";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <SmoothScroll />
      {/* <ModalProvider> */}
      {children}
      {/* </ModalProvider> */}
      <Footer />
    </>
  );
}
