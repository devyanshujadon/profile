import { journalPrefix } from "@/lib/journal-path";

export default async function BlogFooter() {
  const base = await journalPrefix();

  return (
    <footer className="site-foot">
      <div className="shell foot-row">
        <p className="foot-name">Devyanshu Jadon</p>
        <p>Journal</p>
        <ul className="foot-links">
          <li>
            <a href="https://devyanshu.com">Portfolio</a>
          </li>
          <li>
            <a href={`${base}/feed.xml`}>RSS</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
