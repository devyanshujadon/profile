import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[38rem] py-16">
      <p className="label mb-4">404</p>
      <h1 className="font-display text-3xl tracking-tight text-ink mb-3">
        Page not found
      </h1>
      <p className="text-ink-2 mb-8">
        That entry doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="text-mark hover:text-ink transition-colors">
        ← Back to journal
      </Link>
    </div>
  );
}
