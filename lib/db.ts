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

      // ── Blog posts (writing) ──────────────────────────────────────────
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

      // Advanced post fields (safe to re-run)
      await db`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT`;
      await db`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false`;
      await db`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT`;
      await db`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT`;
      await db`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'`;

      await db`
        CREATE INDEX IF NOT EXISTS blog_posts_published_date_idx
        ON blog_posts (published, date DESC)
      `;
      await db`
        CREATE INDEX IF NOT EXISTS blog_posts_category_idx
        ON blog_posts (category)
      `;
      await db`
        CREATE INDEX IF NOT EXISTS blog_posts_featured_idx
        ON blog_posts (featured)
        WHERE featured = true
      `;

      // ── Generic CMS entries (projects, pages, notes, media, …) ───────
      await db`
        CREATE TABLE IF NOT EXISTS cms_entries (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          type TEXT NOT NULL
            CHECK (type IN ('project', 'page', 'note', 'media')),
          slug TEXT NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT NOT NULL DEFAULT '',
          content TEXT NOT NULL DEFAULT '',
          content_format TEXT NOT NULL DEFAULT 'html'
            CHECK (content_format IN ('html', 'markdown', 'plain')),
          status TEXT NOT NULL DEFAULT 'draft'
            CHECK (status IN ('draft', 'published', 'archived')),
          published BOOLEAN NOT NULL DEFAULT false,
          cover_image TEXT,
          featured BOOLEAN NOT NULL DEFAULT false,
          tags TEXT[] NOT NULL DEFAULT '{}',
          sort_order INT NOT NULL DEFAULT 0,
          meta JSONB NOT NULL DEFAULT '{}'::jsonb,
          date DATE NOT NULL DEFAULT CURRENT_DATE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE (type, slug)
        )
      `;
      await db`
        CREATE INDEX IF NOT EXISTS cms_entries_type_status_idx
        ON cms_entries (type, status, sort_order ASC, date DESC)
      `;
      await db`
        CREATE INDEX IF NOT EXISTS cms_entries_published_idx
        ON cms_entries (type, published, date DESC)
        WHERE published = true
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

/** Alias used by the multi-type CMS layer. */
export async function ensureCmsSchema() {
  return ensureBlogSchema();
}
