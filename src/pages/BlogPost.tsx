import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BlogPost as BlogPostType } from "../types";
import { getPostBySlug } from "../utils/blog";
import { useTheme } from "../context/ThemeContext";

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error loading post:", error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  useEffect(() => {
    console.log("Change image mode called");
    if (!post || !post.content) return;
    const contentDiv = document.querySelector("#blog-content");
    console.log("Got content div");
    if (!contentDiv) return;

    const images = contentDiv.querySelectorAll("img");

    images.forEach((img) => {
      const originalSrc = img.getAttribute("src");
      if (!originalSrc) return;

      const isLight = originalSrc.includes("-light");
      const isDark = originalSrc.includes("-dark");

      const currentTheme = theme === "dark" ? "dark" : "light";

      const oppositeTheme = currentTheme === "dark" ? "light" : "dark";

      if (
        (currentTheme === "dark" && isLight) ||
        (currentTheme === "light" && isDark)
      ) {
        const newSrc = originalSrc.replace(oppositeTheme, currentTheme);

        const testImage = new Image();
        testImage.onload = () => {
          img.src = newSrc;
        };
        // Do nothing if the image fails to load
        testImage.onerror = () => {};
        testImage.src = newSrc;
      }
    });
  }, [theme, post, post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#1a1a1a] relative">
        <div className="max-w-2xl mx-auto px-6 py-16">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1a1a1a] relative">
      {/* Back button - Desktop Only */}
      <div className="hidden lg:block fixed top-24 left-6 z-40">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Blog
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-medium mb-8 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-12">
            <time>{formatDate(post.date)}</time>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {post.tag}
            </span>
          </div>

          <div
            id="blog-content"
            className="text-gray-700 dark:text-gray-300 leading-relaxed
    [&>p]:mb-6 
    [&>h1]:text-2xl [&>h1]:font-medium [&>h1]:mb-4 
    [&>h2]:text-xl [&>h2]:font-medium [&>h2]:mb-4 
    [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mb-3
    [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6
    [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6
    [&>li]:mb-2
    [&>blockquote]:border-l-4 [&>blockquote]:border-gray-200 [&>blockquote]:dark:border-gray-700 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-6
    [&_a]:text-blue-600 [&_a]:underline dark:[&_a]:text-blue-400
    [&_a:hover]:text-blue-800 dark:[&_a:hover]:text-blue-500"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
