interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex gap-7 items-center justify-center">
      {/* Previous Button */}
      <button className="flex gap-2 items-center opacity-50 hover:opacity-75 transition-opacity">
        <svg
          className="w-12 h-12 rotate-90"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold text-4xl text-white">Previous</span>
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`px-10 py-6 rounded-3xl font-medium text-4xl transition-all ${
            page === currentPage
              ? "bg-[#1f1f1f] border border-[#d9d9d9] text-white"
              : "text-white hover:text-[#bbfb4c]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button className="flex gap-2 items-center hover:opacity-75 transition-opacity">
        <span className="font-bold text-4xl text-white">Next</span>
        <svg
          className="w-12 h-12 rotate-[-90deg]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
