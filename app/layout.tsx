import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const fontCormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const fontManrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devyanshu Jadon",
  description: "AI and Backend Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontCormorant.variable} ${fontManrope.variable} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <div className="noise-overlay"></div>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}