import { Navigation } from "../components/Navigation";
import { BlogPostHero } from "../components/blog-post/BlogPostHero";
import { BlogPostContent } from "../components/blog-post/BlogPostContent";
import { BlogPostNewsletter } from "../components/blog-post/BlogPostNewsletter";
import { RelatedArticles } from "../components/blog-post/RelatedArticles";
import { CommentsSection } from "../components/blog-post/CommentsSection";
import { BlogPostCTA } from "../components/blog-post/BlogPostCTA";
import { Footer } from "../components/Footer";
import { blogPostsData } from "../data/blogPosts";
import { BlogPost as BlogPostType } from "../types/blog";

interface BlogPostProps {
  postId: string;
}

export function BlogPost({ postId }: BlogPostProps) {
  const post = blogPostsData.find((p) => p.id === postId);

  // If post not found or has no content, show a fallback
  if (!post || !post.content) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">
              The article you're looking for doesn't exist or is no longer available.
            </p>
            <button
              onClick={() => {
                if ((window as any).navigateTo) {
                  (window as any).navigateTo("blog");
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Blog
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBack = () => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo("blog");
    }
  };

  // Get related articles (same category, excluding current post)
  const relatedArticles = blogPostsData
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <BlogPostHero
        title={post.title}
        author={post.author}
        date={post.date}
        readTime={post.readTime}
        heroImage={post.content.heroImage}
        category={post.category}
        onBack={handleBack}
      />

      <BlogPostContent content={post.content} />

      <BlogPostNewsletter />

      {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}

      <CommentsSection />

      <BlogPostCTA />

      <Footer />
    </div>
  );
}
