import type { Metadata } from "next";
import { CartProvider } from "../providers/CartProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Brands Hub 49 | Premium Watch Store",
  description: "Discover luxury, smart, and sport watches at Brands Hub 49. Your one-stop destination for premium timepieces.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-center" />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
