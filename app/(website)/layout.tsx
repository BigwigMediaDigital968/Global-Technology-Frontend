import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import SmoothScroll from "@/app/components/shared/SmoothScroll";
import { ModalProvider } from "../Context/ModalContext";
import FloatingActions from "../components/shared/FloatingActions";
import { Toaster } from "react-hot-toast";

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
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* </ModalProvider> */}
      <FloatingActions />
      <Footer />
    </>
  );
}
