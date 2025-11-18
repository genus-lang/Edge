import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-white/10 hover:border-[#00FF88]/50 hover:bg-[#00FF88]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        // Show first page, last page, current page, and pages around current
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-[40px] rounded-lg transition-all ${
                page === currentPage
                  ? "bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black"
                  : "border border-white/10 hover:border-[#00FF88]/50 hover:bg-[#00FF88]/10"
              }`}
            >
              {page}
            </button>
          );
        } else if (page === currentPage - 2 || page === currentPage + 2) {
          return (
            <span key={page} className="px-2 text-gray-500">
              …
            </span>
          );
        }
        return null;
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-white/10 hover:border-[#00FF88]/50 hover:bg-[#00FF88]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
