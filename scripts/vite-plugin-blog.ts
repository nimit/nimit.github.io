import { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";
import frontMatter from "front-matter";
import MarkdownIt from "markdown-it";

interface BlogFrontmatter {
  title: string;
  date: string;
  description?: string;
  tag: "Tech" | "Life" | "Other";
}

interface BlogManifestEntry {
  slug: string;
  title: string;
  date: string;
  description: string;
  tag: "Tech" | "Life" | "Other";
  isNew: boolean;
}

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    return `<pre class="bg-gray-50 dark:bg-[#2a2a2a] p-4 rounded-lg overflow-x-auto"><code class="language-${lang}">${escapeHtml(str)}</code></pre>`;
  },
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function blogPlugin(): Plugin {
  const blogDir = "src/content/blog";
  const outputDir = "public/blog";

  return {
    name: "vite-plugin-blog",

    buildStart() {
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const manifest: BlogManifestEntry[] = [];
      const blogPath = path.resolve(process.cwd(), blogDir);

      if (!fs.existsSync(blogPath)) {
        console.warn(`[vite-plugin-blog] Blog directory not found: ${blogPath}`);
        return;
      }

      const files = fs.readdirSync(blogPath).filter((f: string) => f.endsWith(".md"));

      for (const file of files) {
        const filePath = path.join(blogPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const slug = file.replace(/\.md$/, "");

        try {
          const { attributes, body } = frontMatter<BlogFrontmatter>(content);
          const htmlContent = md.render(body);
          const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

          // Write rendered HTML
          const htmlPath = path.join(outputDir, `${slug}.html`);
          fs.writeFileSync(htmlPath, htmlContent, "utf-8");

          // Add to manifest
          manifest.push({
            slug,
            title: attributes.title,
            date: attributes.date,
            description: attributes.description || body.slice(0, 150) + "...",
            tag: attributes.tag,
            isNew: new Date(attributes.date).getTime() > sevenDaysAgo,
          });

          console.log(`[vite-plugin-blog] Generated: ${slug}.html`);
        } catch (error) {
          console.error(`[vite-plugin-blog] Error processing ${file}:`, error);
        }
      }

      // Sort by date descending
      manifest.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Write manifest
      const manifestPath = path.join(outputDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
      console.log(`[vite-plugin-blog] Generated manifest with ${manifest.length} posts`);
    },
  };
}
