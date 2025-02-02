import type { Metadata } from "next";

import "./globals.css";
import SessionProvider from "../providers/SessionProvider";
import Navbar from "@/components/Navbar";
import { jost } from "@/components/font";
import CartProvider from "@/providers/CartProvider";
import ToasterClient from "@/components/ToasterClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Luxeon - Redefine your space",
  description:
    "We create timeless, handcrafted furniture that brings sophistication and character to your home. Each piece is designed with passion,precision, and an eye for detail because your space deserves nothingless than perfection.",
  openGraph: {
    images: [{ url: "../assets/luxeonheroimage.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <CartProvider>
          <body
            className={`${jost.className} antialiased max-w-7xl mx-auto bg-white`}
          >
            <ToasterClient />
            <Navbar />
            <main className="mt-16 min-h-screen">{children}</main>
            <Footer />
          </body>
        </CartProvider>
      </SessionProvider>
    </html>
  );
}
