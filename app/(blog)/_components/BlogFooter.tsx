import Link from "next/link";

const BlogFooter = () => {
  return (
    <footer className="site-foot">
      <p className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-ink-3">
        © {new Date().getFullYear()} Devyanshu Jadon
      </p>
      <Link href="https://devyanshu.com" className="nav-link">
        Back to portfolio
      </Link>
    </footer>
  );
};

export default BlogFooter;
