import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createFile, getGitHubUser } from "@/lib/github";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const OWNER = process.env.GITHUB_OWNER || "Devyanshu";

  const githubUser = await getGitHubUser(session.accessToken);

  try {
    const body = await request.json();
    const { title, content, category, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const date = new Date().toISOString().split("T")[0];
    
    const frontmatter = `---
title: "${title}"
date: "${date}"
excerpt: "${body.excerpt || ""}"
category: "${category || "Tech"}"
tags: ${JSON.stringify(tags || [])}
published: ${published !== false}
---

${content}
`;

    const path = `content/blog/${slug}.md`;
    const message = `Add blog post: ${title}`;

    await createFile(session.accessToken, path, frontmatter, message);

    return NextResponse.json({ success: true, slug, path });
  } catch (error) {
    console.error("Error creating post:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create post";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}