import Link from "next/link";

const BlogFooter = () => {
  return (
    <footer className="px-6 sm:px-10 pb-12">
      <div className="mx-auto max-w-[920px] border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-ink-3">
          © {new Date().getFullYear()} Devyanshu Jadon
        </p>
        <Link href="https://devyanshu.com" className="text-sm text-ink-3 hover:text-mark transition-colors">
          Back to portfolio
        </Link>
      </div>
    </footer>
  );
};

export default BlogFooter;
