import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "./Context/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Global Technologies",
  description: "Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
