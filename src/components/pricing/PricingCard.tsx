import { Button } from "../ui/button";
import { Check, Star } from "lucide-react";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "popular" | "outline";
  isPopular?: boolean;
  trustTag?: string;
}

export function PricingCard({
  name,
  description,
  price,
  period,
  features,
  buttonText,
  buttonVariant = "default",
  isPopular = false,
  trustTag,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 border transition-all duration-300 ${
        isPopular
          ? "border-[#00FF88]/50 shadow-2xl shadow-[#00FF88]/20 scale-105"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black px-6 py-2 rounded-full flex items-center gap-2">
            <Star size={16} fill="currentColor" />
            <span className="text-sm">Most Popular</span>
          </div>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl mb-3">{name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-6">{description}</p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl">{price}</span>
          {period && <span className="text-gray-400">/ {period}</span>}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        size="lg"
        className={`w-full mb-6 ${
          buttonVariant === "popular"
            ? "bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity shadow-lg shadow-[#00FF88]/30"
            : buttonVariant === "outline"
            ? "border-white/20 hover:border-[#00FF88] hover:bg-[#00FF88]/10 transition-colors"
            : "bg-white/5 hover:bg-white/10 transition-colors"
        }`}
        variant={buttonVariant === "outline" ? "outline" : "default"}
      >
        {buttonText}
      </Button>

      {/* Trust Tag */}
      {trustTag && <p className="text-xs text-gray-500 text-center mb-6">{trustTag}</p>}

      {/* Features List */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="text-[#00FF88] flex-shrink-0 mt-0.5" size={18} />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
