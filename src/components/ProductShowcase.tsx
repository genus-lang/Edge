import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screens = [
    {
      title: "Build Strategies",
      description: "Design rules visually or write custom code",
      image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYzMzcwOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Analyze P&L",
      description: "Track performance with detailed analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjMzMzUxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      title: "Optimize & Deploy",
      description: "Fine-tune and go live with confidence",
      image: "https://images.unsplash.com/photo-1761587941453-bd1790225d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY2hhcnQlMjBmaW5hbmNpYWx8ZW58MXx8fHwxNjM0MDMyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            The most powerful trading strategy platform — in one dashboard
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, test, and deploy winning strategies
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-[#0A0A0A] to-black">
              <ImageWithFallback
                src={screens[currentIndex].image}
                alt={screens[currentIndex].title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Image Label */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl mb-2">
                  {screens[currentIndex].title}
                </h3>
                <p className="text-gray-400">
                  {screens[currentIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl border-white/20 hover:bg-black/70"
            onClick={prev}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl border-white/20 hover:bg-black/70"
            onClick={next}
          >
            <ChevronRight size={24} />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {screens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[#00FF88] w-8"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
