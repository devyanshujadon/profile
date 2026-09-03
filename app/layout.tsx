import type { Metadata } from "next";
import { Archivo, Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import JsonLd from "@/components/JsonLd";
import { homepageJsonLd } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s · Devyanshu",
    default: "Devyanshu Jadon",
  },
  description:
    "AI and backend engineer. Building intelligent systems and products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${archivoBlack.variable} ${plexMono.variable} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <JsonLd data={homepageJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
