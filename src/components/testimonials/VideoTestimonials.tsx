import { Play } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const videos = [
  {
    title: "How Quant helped me automate my trading strategy",
    duration: "4 min",
    thumbnail: "https://images.unsplash.com/photo-1639917714192-557a6143f788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Sarah Johnson, Day Trader",
  },
  {
    title: "From manual backtesting to AI optimization",
    duration: "6 min",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Michael Rodriguez, Quant Developer",
  },
  {
    title: "Building a profitable crypto arbitrage system",
    duration: "5 min",
    thumbnail: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "David Kim, Crypto Trader",
  },
  {
    title: "Why our hedge fund switched to Quant",
    duration: "7 min",
    thumbnail: "https://images.unsplash.com/photo-1639917714192-557a6143f788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Jennifer Lee, Portfolio Manager",
  },
];

export function VideoTestimonials() {
  const handleVideoClick = (title: string) => {
    // Handle video modal/playback
    console.log("Playing video:", title);
  };

  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12 text-center">
          Hear It From the Traders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => handleVideoClick(video.title)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 transition-all" />

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00FF88] to-[#00C8FF] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-[#00FF88]/50">
                    <Play size={28} className="text-black ml-1" fill="black" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white">
                  {video.duration}
                </div>
              </div>

              <h3 className="text-white mb-2 group-hover:text-[#00FF88] transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400">{video.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
