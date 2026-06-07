import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BlogFooter = () => {
  return (
    <footer className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 border-t-3 border-ink">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h4 className="font-display font-bold text-2xl text-ink">
            DEVYANSHU JADON<span className="text-accent">.</span>
          </h4>
          <p className="mono text-xs text-ink-light mt-1">
            &copy; {new Date().getFullYear()} — JOURNAL
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="mono text-xs text-ink-light">
            BUILT WITH NEXT.JS · HOSTED ON VERCEL
          </span>
          <Link
            href="https://devyanshu.com"
            className="inline-flex items-center gap-1 mono text-xs font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors"
          >
            Main site
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;
