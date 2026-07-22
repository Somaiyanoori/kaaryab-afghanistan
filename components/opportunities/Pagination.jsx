"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2">
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-9 h-9 md:w-10 md:h-10 rounded-lg",
          "flex items-center justify-center",
          "text-sm font-semibold",
          "border transition-all duration-200",
          currentPage === 1
            ? "bg-gray-100 dark:bg-slate-800 text-gray-400 border-gray-200 dark:border-slate-700 cursor-not-allowed"
            : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-yellow-500 hover:text-yellow-600",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-lg",
              "flex items-center justify-center",
              "text-sm font-semibold",
              "border transition-all duration-200",
              isActive
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-yellow-500 hover:text-yellow-600",
            )}
          >
            {page}
          </motion.button>
        );
      })}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-9 h-9 md:w-10 md:h-10 rounded-lg",
          "flex items-center justify-center",
          "text-sm font-semibold",
          "border transition-all duration-200",
          currentPage === totalPages
            ? "bg-gray-100 dark:bg-slate-800 text-gray-400 border-gray-200 dark:border-slate-700 cursor-not-allowed"
            : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-yellow-500 hover:text-yellow-600",
        )}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
}
