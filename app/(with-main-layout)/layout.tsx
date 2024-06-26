import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ThemeSwitch from "../components/ThemeSwitch";
import Link from "next/link";
import Headers from "../components/Header";
import Providers from "../providers";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devyanshu Jadon",
  description: "Creating with Passion, Coding with Purpose: Welcome to My Journey!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className="bg-[#fffbf5] dark:bg-[#17223B]" >
        <Providers>

          {/* Header */}
          <Headers />

          {/* Page */}
          <main>{children}</main>

          {/* Footer */}
          
          <Footer />
        
        </Providers>
      </body>
    </html>
  );
}
