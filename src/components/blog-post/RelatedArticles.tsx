import { BlogPost } from "../../types/blog";
import { BlogCard } from "../blog/BlogCard";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className="px-6 lg:px-8 py-16 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12">You Might Also Like</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
