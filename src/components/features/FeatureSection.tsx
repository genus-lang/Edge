import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

interface FeatureSectionProps {
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

export function FeatureSection({
  title,
  description,
  bullets,
  imageUrl,
  imageAlt,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <div className={`${reverse ? "lg:order-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">{description}</p>

            {/* Bullets */}
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <CheckCircle2
                    className="text-[#00FF88] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <span className="text-gray-300">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className={`${reverse ? "lg:order-1" : ""}`}>
            <div className="relative group">
              {/* Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity blur" />
              
              {/* Image Container */}
              <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 via-transparent to-[#00C8FF]/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
