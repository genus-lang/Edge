import { Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface TestimonialCardProps {
  name: string;
  role: string;
  rating: number;
  testimonial: string;
  image: string;
}

export function TestimonialCard({ name, role, rating, testimonial, image }: TestimonialCardProps) {
  return (
    <div className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-8 hover:border-[#00FF88]/50 hover:shadow-2xl hover:shadow-[#00FF88]/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg text-white">{name}</h3>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < rating
                ? "fill-[#00FF88] text-[#00FF88]"
                : "fill-gray-700 text-gray-700"
            }
          />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-gray-300 leading-relaxed flex-1">"{testimonial}"</p>
    </div>
  );
}
