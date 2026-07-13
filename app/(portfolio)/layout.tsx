import type { Metadata } from "next";
import PortfolioChrome from "@/components/PortfolioChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://devyanshu.com"),
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell min-h-screen">
      <PortfolioChrome>{children}</PortfolioChrome>
    </div>
  );
}
