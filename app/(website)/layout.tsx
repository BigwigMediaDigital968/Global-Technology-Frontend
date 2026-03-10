import Footer from "../components/website/Footer";
import Navbar from "../components/website/Navbar";
import SmoothScroll from "@/app/components/shared/SmoothScroll";
import { ModalProvider } from "../Context/ModalContext";
<<<<<<< Updated upstream
import { Toaster } from "react-hot-toast";
=======
import FloatingActions from "../components/shared/FloatingActions";
>>>>>>> Stashed changes

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
