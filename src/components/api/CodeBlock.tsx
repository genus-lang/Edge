import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Language Badge */}
      <div className="absolute top-3 left-3 px-3 py-1 bg-[#00FF88]/20 border border-[#00FF88]/30 rounded text-xs text-[#00FF88] uppercase">
        {language}
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FF88]/50 rounded transition-all duration-200"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <Check size={16} className="text-[#00FF88]" />
        ) : (
          <Copy size={16} className="text-gray-400" />
        )}
      </button>

      {/* Code Block */}
      <pre className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 pt-12 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono leading-relaxed">
          {code}
        </code>
      </pre>

      {/* Copied Tooltip */}
      {copied && (
        <div className="absolute top-14 right-3 bg-[#00FF88] text-black text-xs px-2 py-1 rounded animate-in fade-in slide-in-from-top-2">
          Copied!
        </div>
      )}
    </div>
  );
}
