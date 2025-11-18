import { CheckCircle2, Zap, AlertCircle, Sparkles } from "lucide-react";

interface ChangeItem {
  text: string;
}

interface VersionCardProps {
  version: string;
  date: string;
  isLaunch?: boolean;
  newFeatures?: ChangeItem[];
  improvements?: ChangeItem[];
  fixes?: ChangeItem[];
  launchItems?: string[];
}

export function VersionCard({
  version,
  date,
  isLaunch,
  newFeatures = [],
  improvements = [],
  fixes = [],
  launchItems = [],
}: VersionCardProps) {
  return (
    <div className="relative">
      {/* Timeline Node */}
      <div className="absolute left-0 top-8 w-4 h-4 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] rounded-full animate-pulse" />
      
      {/* Card */}
      <div className="ml-12 bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#00FF88]/30 transition-all duration-300">
        {/* Version Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-2xl md:text-3xl mb-2 md:mb-0">
            {isLaunch && <span className="mr-2">🎉</span>}
            Version {version}
          </h3>
          <span className="text-gray-400">{date}</span>
        </div>

        {/* Launch Items */}
        {isLaunch && launchItems.length > 0 && (
          <div className="mb-4">
            <p className="text-[#00FF88] mb-3">Official Quant Launch</p>
            <ul className="space-y-2">
              {launchItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <Sparkles size={16} className="text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* New Features */}
        {newFeatures.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[#00FF88] mb-3 flex items-center gap-2">
              <span className="text-lg">New</span>
            </h4>
            <ul className="space-y-2">
              {newFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <CheckCircle2 size={16} className="text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {improvements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[#00C8FF] mb-3 flex items-center gap-2">
              <span className="text-lg">Improvements</span>
            </h4>
            <ul className="space-y-2">
              {improvements.map((improvement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <Zap size={16} className="text-[#00C8FF] flex-shrink-0 mt-0.5" />
                  <span>{improvement.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fixes */}
        {fixes.length > 0 && (
          <div>
            <h4 className="text-yellow-400 mb-3 flex items-center gap-2">
              <span className="text-lg">Fixes</span>
            </h4>
            <ul className="space-y-2">
              {fixes.map((fix, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <AlertCircle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{fix.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
