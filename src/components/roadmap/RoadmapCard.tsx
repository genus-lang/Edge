import { useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

interface RoadmapCardProps {
  title: string;
  description: string;
  eta?: string;
  votes: number;
  label?: string;
  showComments?: boolean;
}

export function RoadmapCard({
  title,
  description,
  eta,
  votes: initialVotes,
  label,
  showComments = false,
}: RoadmapCardProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(votes + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-[#0A0A0A] to-black border border-white/10 rounded-xl p-6 hover:border-[#00FF88]/50 hover:shadow-xl hover:shadow-[#00FF88]/10 transition-all duration-300 hover:-translate-y-1">
      {/* Label */}
      {label && (
        <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 mb-3">
          {label}
        </span>
      )}

      {/* Title */}
      <h4 className="text-lg mb-2 group-hover:text-[#00FF88] transition-colors">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      {/* ETA */}
      {eta && (
        <p className="text-xs text-gray-500 mb-4">
          Expected: <span className="text-[#00C8FF]">{eta}</span>
        </p>
      )}

      {/* Footer - Vote Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleVote}
          disabled={hasVoted}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            hasVoted
              ? "bg-[#00FF88]/20 border-[#00FF88]/50 text-[#00FF88] cursor-not-allowed"
              : "bg-white/5 border-white/10 hover:border-[#00FF88]/50 hover:bg-white/10 text-gray-300"
          }`}
        >
          <ArrowUp
            size={16}
            className={hasVoted ? "animate-bounce" : ""}
          />
          <span className="text-sm">{votes}</span>
        </button>

        {/* Comments */}
        {showComments && (
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00C8FF] transition-colors">
            <MessageCircle size={16} />
            <span>Comments</span>
          </button>
        )}
      </div>

      {/* Voted Indicator */}
      {hasVoted && (
        <p className="text-xs text-[#00FF88] mt-2 italic">
          ✓ You voted for this!
        </p>
      )}
    </div>
  );
}
