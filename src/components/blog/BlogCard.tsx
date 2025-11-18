import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BlogCardProps {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  thumbnail: string;
  featured?: boolean;
}

export function BlogCard({
  id,
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  thumbnail,
  featured = false,
}: BlogCardProps) {
  const handleClick = () => {
    if ((window as any).navigateToBlogPost) {
      (window as any).navigateToBlogPost(id);
      window.scrollTo(0, 0);
    }
  };

  return (
    <article
      onClick={handleClick}
      className={`group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:scale-[1.02] ${
        featured ? "col-span-1 md:col-span-2" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black text-xs rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className={`mb-3 text-white group-hover:text-[#00FF88] transition-colors ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{excerpt}</p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={`https://i.pravatar.cc/300?u=${author}`}
              alt={author}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="text-gray-300">{author}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{date}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[#00FF88] group-hover:gap-4 transition-all">
            <span className="text-sm">Read More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </article>
  );
}