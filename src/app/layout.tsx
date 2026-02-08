import type { Metadata } from "next";
import { CartProvider } from "../providers/CartProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Brands Hub 49 | Premium Watch Store",
  description: "Discover luxury, smart, and sport watches at Brands Hub 49. Your one-stop destination for premium timepieces from top brands like Rolex, Omega, and Apple.",
  keywords: "watches, luxury watches, smart watches, sport watches, brands hub 49, rolex, omega, apple watch, buy watches online india",
  openGraph: {
    title: "Brands Hub 49 | Premium Watch Store",
    description: "Discover luxury, smart, and sport watches at Brands Hub 49. Your one-stop destination for premium timepieces.",
    url: "https://brands-hub49.vercel.app",
    siteName: "Brands Hub 49",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Using a hero product image as default
        width: 1200,
        height: 630,
        alt: "Brands Hub 49 Premium Watches",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brands Hub 49 | Premium Watch Store",
    description: "Discover luxury, smart, and sport watches at Brands Hub 49.",
    images: ["https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

import Analytics from "../components/Analytics";

import { Suspense } from "react";

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
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
