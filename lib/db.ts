import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

export async function ensureBlogSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getSql();
      await db`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL DEFAULT '',
          content TEXT NOT NULL DEFAULT '',
          content_format TEXT NOT NULL DEFAULT 'html'
            CHECK (content_format IN ('html', 'markdown')),
          category TEXT NOT NULL DEFAULT 'Tech',
          tags TEXT[] NOT NULL DEFAULT '{}',
          published BOOLEAN NOT NULL DEFAULT true,
          date DATE NOT NULL DEFAULT CURRENT_DATE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await db`
        CREATE INDEX IF NOT EXISTS blog_posts_published_date_idx
        ON blog_posts (published, date DESC)
      `;
      await db`
        CREATE INDEX IF NOT EXISTS blog_posts_category_idx
        ON blog_posts (category)
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}
