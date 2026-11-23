import type { Metadata } from "next";
import { SiteFrame } from "@/components/site/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://devyanshu.com"),
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteFrame>{children}</SiteFrame>;
}
