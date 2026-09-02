import type { Metadata } from "next";
import { Newsreader, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import JsonLd from "@/components/JsonLd";
import { homepageJsonLd } from "@/lib/site";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        className={`${newsreader.variable} ${publicSans.variable} ${plexMono.variable} antialiased custom-scrollbar`}
        suppressHydrationWarning
      >
        <JsonLd data={homepageJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
