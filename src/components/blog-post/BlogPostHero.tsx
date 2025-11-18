import { ArrowLeft, Twitter, Linkedin, Share2, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

interface BlogPostHeroProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  category: string;
  onBack: () => void;
}

export function BlogPostHero({
  title,
  author,
  date,
  readTime,
  heroImage,
  category,
  onBack,
}: BlogPostHeroProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = title;
    
    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <section className="relative pt-28 pb-12 px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Blog
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black text-sm rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
          {title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={`https://i.pravatar.cc/300?u=${author}`}
              alt={author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-white">By {author}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{date}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-400">Share:</span>
            <button
              onClick={() => handleShare("twitter")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF88]/50 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF88]/50 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF88]/50 transition-colors"
              aria-label="Copy link"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-xl overflow-hidden aspect-video mb-12">
          <ImageWithFallback
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
