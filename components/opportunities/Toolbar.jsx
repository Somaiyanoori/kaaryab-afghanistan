"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import { SORT_OPTIONS } from "../../lib/constants.js";
import { cn } from "../../lib/utils.js";

export default function Toolbar({
  totalResults,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenFilters,
  activeFilterCount,
}) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Results Count */}
      <div className="text-sm">
        <span className="font-bold text-gray-900 dark:text-white">
          {totalResults}
        </span>{" "}
        <span className="text-gray-500 dark:text-gray-400">
          {totalResults === 1 ? "opportunity" : "opportunities"} found
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Filter Button (Mobile) */}
        <motion.button
          onClick={onOpenFilters}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "lg:hidden relative flex items-center gap-2",
            "px-3 py-2 rounded-lg",
            "bg-white dark:bg-slate-800",
            "border border-gray-200 dark:border-slate-700",
            "text-sm font-semibold text-gray-700 dark:text-gray-300",
            "hover:border-yellow-500",
            "transition-all duration-200",
          )}
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-500 text-gray-900 rounded-full text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </motion.button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className={cn(
              "appearance-none pl-9 pr-8 py-2 rounded-lg",
              "bg-white dark:bg-slate-800",
              "border border-gray-200 dark:border-slate-700",
              "text-sm font-semibold text-gray-700 dark:text-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-yellow-500",
              "cursor-pointer",
              "hover:border-yellow-500 transition-colors duration-200",
            )}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowUpDown
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-1.5 rounded-md transition-colors duration-200",
              viewMode === "grid"
                ? "bg-yellow-500 text-gray-900"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700",
            )}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-1.5 rounded-md transition-colors duration-200",
              viewMode === "list"
                ? "bg-yellow-500 text-gray-900"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700",
            )}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
