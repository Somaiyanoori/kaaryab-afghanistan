"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils.js";

// Quick filter suggestions
const QUICK_FILTERS = [
  { label: "Jobs", category: "Job" },
  { label: "Scholarships", category: "Scholarship" },
  { label: "Remote Work", category: "Remote Work" },
  { label: "Internships", category: "Internship" },
  { label: "Online Courses", category: "Online Course" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchValue.trim()) {
      router.push(
        `/opportunities?search=${encodeURIComponent(searchValue.trim())}`,
      );
    } else {
      router.push("/opportunities");
    }
  };

  const handleQuickFilter = (category) => {
    router.push(`/opportunities?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <motion.div
          className={cn(
            "relative flex items-center",
            "bg-white/95 dark:bg-slate-800/95",
            "backdrop-blur-md",
            "rounded-2xl",
            "shadow-2xl",
            "border-2 transition-all duration-300",
            isFocused
              ? "border-yellow-500 shadow-yellow-glow"
              : "border-white/20 dark:border-white/10",
          )}
          whileHover={{ scale: 1.01 }}
        >
          {/* Search Icon */}
          <div className="pl-5 pr-3 flex items-center pointer-events-none">
            <Search
              size={20}
              className={cn(
                "transition-colors duration-200",
                isFocused ? "text-yellow-500" : "text-gray-400",
              )}
            />
          </div>

          {/* Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search jobs, scholarships, internships..."
            className={cn(
              "flex-1 py-4 pr-4",
              "bg-transparent",
              "text-gray-900 dark:text-white",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "text-base",
              "focus:outline-none",
            )}
          />

          {/* Search Button (Inline with input) */}
          <motion.button
            type="submit"
            className={cn(
              "m-2 px-6 py-3",
              "bg-gradient-to-r from-yellow-500 to-yellow-600",
              "hover:from-yellow-400 hover:to-yellow-500",
              "text-gray-900 font-semibold",
              "rounded-xl",
              "flex items-center gap-2",
              "shadow-md hover:shadow-yellow-glow",
              "transition-all duration-200",
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hidden sm:inline">Search</span>
            <Search size={16} className="sm:hidden" />
          </motion.button>
        </motion.div>
      </form>

      {/* Quick Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
      >
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-2">
          <TrendingUp size={12} />
          <span className="hidden sm:inline">Popular:</span>
        </div>
        {QUICK_FILTERS.map((filter, index) => (
          <motion.button
            key={filter.category}
            onClick={() => handleQuickFilter(filter.category)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.05 }}
            className={cn(
              "px-3.5 py-1.5",
              "text-xs font-medium",
              "bg-white/10 hover:bg-white/20",
              "border border-white/20 hover:border-yellow-500/50",
              "text-white",
              "rounded-full",
              "transition-all duration-200",
              "backdrop-blur-sm",
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
