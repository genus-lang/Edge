import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rahul S.",
      role: "Quant Trader",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      quote:
        "Quant cut my strategy development time from weeks to hours. The backtest engine is unbelievably fast.",
    },
    {
      name: "Emma T.",
      role: "Algorithmic Trader",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      quote:
        "The AI optimization helped me discover parameters I'd never consider manually. Game changer.",
    },
    {
      name: "Michael Chen",
      role: "Crypto Trader",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 5,
      quote:
        "Quant helped me automate my trading and double my efficiency. Backtesting speed is insane.",
    },
    {
      name: "Sarah Johnson",
      role: "Retail Trader",
      avatar: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      quote:
        "Finally, a platform that makes algo trading accessible without needing a PhD in computer science.",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            Loved by traders worldwide
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of traders who trust Quant for their algorithmic trading
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-6 border border-white/10 hover:border-[#00FF88]/30 transition-all duration-300 hover:scale-105"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#00FF88] text-[#00FF88]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#00FF88]/20">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
