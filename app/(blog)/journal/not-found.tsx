import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <div className="mb-6 px-4 py-1 bg-ink text-base inline-block">
        <span className="mono text-sm text-base">404 — NOT FOUND</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-6 tracking-tight">
        ENTRY<span className="text-accent">.</span>
        <br />
        MISSING<span className="text-accent">.</span>
      </h1>
      <p className="text-lg font-display font-medium text-ink-light max-w-md mx-auto mb-10 leading-relaxed">
        THE PAGE YOU&apos;RE LOOKING FOR DOESN&apos;T EXIST OR HAS BEEN MOVED.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 brutal-btn"
      >
        <ArrowLeft size={16} />
        Back to Journal
      </Link>
    </div>
  );
}
