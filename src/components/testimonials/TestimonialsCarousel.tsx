import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Rahul S.",
    role: "Quant Trader",
    rating: 5,
    testimonial:
      "Quant's AI optimization improved my strategy performance dramatically. The backtesting speed is next-level.",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Emma T.",
    role: "Algorithmic Trader",
    rating: 5,
    testimonial:
      "The drag-and-drop builder makes automating strategies feel effortless. It's now a core part of my trading routine.",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Jonathan K.",
    role: "Hedge Fund Analyst",
    rating: 5,
    testimonial:
      "The risk analytics are institutional grade. Our team relies on Quant daily.",
    image: "https://i.pravatar.cc/300?img=33",
  },
  {
    name: "Alice M.",
    role: "Crypto Trader",
    rating: 5,
    testimonial:
      "I automated my crypto strategies and saw a 40% improvement in consistency.",
    image: "https://i.pravatar.cc/300?img=9",
  },
  {
    name: "David L.",
    role: "Day Trader",
    rating: 5,
    testimonial:
      "The real-time execution and paper trading features are phenomenal. I can test ideas before risking capital.",
    image: "https://i.pravatar.cc/300?img=15",
  },
  {
    name: "Sophie Chen",
    role: "Portfolio Manager",
    rating: 5,
    testimonial:
      "Managing multiple strategies across different asset classes has never been easier. The portfolio analytics are top-tier.",
    image: "https://i.pravatar.cc/300?img=20",
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIndex((prev) => Math.min(testimonials.length - 3, prev + 1));
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 400; // approximate card width + gap
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-none w-[340px] lg:w-[380px]">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden lg:block">
            <button
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-full hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[#00FF88]/30"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={currentIndex >= testimonials.length - 3}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black rounded-full hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[#00FF88]/30"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dot Indicators - Mobile */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#00FF88] w-8"
                  : "bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
