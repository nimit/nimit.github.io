import type { BlogPost, BlogFrontmatter } from "../types";

// Development mode: parse markdown at runtime
// Production mode: fetch pre-rendered HTML from static files
const isDev = import.meta.env.DEV;

type TagType = "Tech" | "Life" | "Other";

interface ManifestEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  tag: TagType;
  isNew: boolean;
}

// Cache for manifest and posts
let manifestCache: ManifestEntry[] | null = null;
const postCache = new Map<string, string>();

async function getManifest(): Promise<ManifestEntry[]> {
  if (manifestCache) return manifestCache;

  if (isDev) {
    // In dev mode, dynamically import and parse markdown
    return getManifestFromSource();
  }

  try {
    const response = await fetch("/blog/manifest.json");
    if (!response.ok) {
      console.warn("Failed to fetch manifest, falling back to source");
      return getManifestFromSource();
    }
    manifestCache = await response.json();
    return manifestCache!;
  } catch (error) {
    console.error("Error fetching manifest:", error);
    return getManifestFromSource();
  }
}

async function getManifestFromSource(): Promise<ManifestEntry[]> {
  const frontMatter = (await import("front-matter")).default;

  const files = import.meta.glob("/src/content/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const entries = Object.entries(files)
    .map(([filepath, content]) => {
      if (typeof content !== "string") return null;

      const fileName = filepath.split("/").pop() || "";
      const slug = fileName.replace(/\.md$/, "");

      try {
        const { attributes, body } = frontMatter<BlogFrontmatter>(content);

        return {
          slug,
          title: attributes.title,
          date: attributes.date,
          description: attributes.description || body.slice(0, 150) + "...",
          tag: attributes.tag,
          isNew: new Date(attributes.date).getTime() > sevenDaysAgo,
        } as ManifestEntry;
      } catch {
        return null;
      }
    })
    .filter((e): e is ManifestEntry => e !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  manifestCache = entries;
  return entries;
}

async function getPostContent(slug: string): Promise<string | null> {
  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }

  if (isDev) {
    return getPostContentFromSource(slug);
  }

  try {
    const response = await fetch(`/blog/${slug}.html`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${slug}.html, falling back to source`);
      return getPostContentFromSource(slug);
    }
    const content = await response.text();
    postCache.set(slug, content);
    return content;
  } catch (error) {
    console.error(`Error fetching ${slug}.html:`, error);
    return getPostContentFromSource(slug);
  }
}

async function getPostContentFromSource(slug: string): Promise<string | null> {
  const frontMatter = (await import("front-matter")).default;
  const MarkdownIt = (await import("markdown-it")).default;

  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
      return `<pre class="bg-gray-50 dark:bg-[#2a2a2a] p-4 rounded-lg overflow-x-auto"><code class="language-${lang}">${str}</code></pre>`;
    },
  });

  const files = import.meta.glob("/src/content/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const filePath = Object.keys(files).find((path) =>
    path.includes(`${slug}.md`)
  );
  if (!filePath) return null;

  const content = files[filePath];
  if (typeof content !== "string") return null;

  try {
    const { body } = frontMatter(content);
    const html = md.render(body);
    postCache.set(slug, html);
    return html;
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const manifest = await getManifest();

  return manifest.map((entry): BlogPost => ({
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    description: entry.description,
    tag: entry.tag,
    isNew: entry.isNew,
    content: "", // Content loaded separately when viewing post
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const manifest = await getManifest();
  const entry = manifest.find((e) => e.slug === slug);

  if (!entry) return null;

  const content = await getPostContent(slug);
  if (!content) return null;

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    description: entry.description,
    tag: entry.tag,
    isNew: entry.isNew,
    content,
  };
}
