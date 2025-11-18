import { MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function OfficeLocation() {
  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">
            Visit Our Office
          </h2>
          <p className="text-gray-400">
            Stop by and meet the team
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Office Details */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-black rounded-2xl p-8 border border-white/10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] p-0.5 rounded-xl flex-shrink-0">
                <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-2">Quant HQ</h3>
                <p className="text-gray-400 leading-relaxed">
                  Fintech Technology Park
                  <br />
                  San Francisco, California
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <MapPin size={16} className="text-[#00FF88]" />
                Visit us by appointment only
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-sm text-gray-400 mb-3">Additional Offices</h4>
              <div className="space-y-2 text-sm text-gray-500">
                <p>🇮🇳 Bangalore, India</p>
                <p>🇸🇬 Singapore</p>
                <p>🇬🇧 London, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Map Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-full min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/10 via-transparent to-[#00C8FF]/10" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1608908272009-5834650fb600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzYzNDA4ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Quant Office"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Map Placeholder Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <MapPin className="text-[#00FF88] mb-2 mx-auto" size={48} />
                <p className="text-white">Interactive map integration</p>
                <p className="text-sm text-gray-400 mt-1">Google Maps embed available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
