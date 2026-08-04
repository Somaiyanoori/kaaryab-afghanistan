"use client";

import { motion } from "framer-motion";
import { X, RotateCcw, MapPin, Briefcase, Calendar } from "lucide-react";
import { locations } from "../../data/opportunities.js";
import { TYPE_LIST, DEADLINE_FILTERS } from "../../lib/constants.js";
import { cn } from "../../lib/utils.js";

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  onClose,
  isMobile = false,
}) {
  const hasActiveFilters =
    filters.location !== "All" ||
    filters.type !== "All" ||
    filters.deadline !== "all";

  return (
    <div className={cn("flex flex-col", isMobile ? "h-full" : "space-y-6")}>
      {/* Header (Mobile Only) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Filters
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Filter Content */}
      <div
        className={cn(
          "flex flex-col gap-6",
          isMobile && "p-4 overflow-y-auto flex-1",
        )}
      >
        {/* Location Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-yellow-500" />
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Location
            </h4>
          </div>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
            className={cn(
              "w-full px-3 py-2.5 rounded-lg",
              "bg-white dark:bg-slate-700",
              "border border-gray-200 dark:border-slate-600",
              "text-sm text-gray-900 dark:text-white",
              "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent",
              "cursor-pointer",
            )}
          >
            <option value="All">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Work Type Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-yellow-500" />
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Work Type
            </h4>
          </div>
          <div className="space-y-2">
            {["All", ...TYPE_LIST].map((type) => (
              <label
                key={type}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg cursor-pointer",
                  "border transition-all duration-200",
                  filters.type === type
                    ? "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-500"
                    : "bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-yellow-300",
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.type === type}
                  onChange={(e) => onFilterChange("type", e.target.value)}
                  className="w-4 h-4 accent-yellow-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
                  {type === "All" ? "All Types" : type}
                </span>
                {type !== "All" && (
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      type === "Remote" && "bg-green-500",
                      type === "On-site" && "bg-blue-500",
                      type === "Hybrid" && "bg-purple-500",
                    )}
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Deadline Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-yellow-500" />
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Deadline
            </h4>
          </div>
          <div className="space-y-2">
            {DEADLINE_FILTERS.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg cursor-pointer",
                  "border transition-all duration-200",
                  filters.deadline === option.value
                    ? "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-500"
                    : "bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-yellow-300",
                )}
              >
                <input
                  type="radio"
                  name="deadline"
                  value={option.value}
                  checked={filters.deadline === option.value}
                  onChange={(e) => onFilterChange("deadline", e.target.value)}
                  className="w-4 h-4 accent-yellow-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClearAll}
            className={cn(
              "flex items-center justify-center gap-2",
              "w-full py-2.5 rounded-lg",
              "bg-red-50 hover:bg-red-100",
              "dark:bg-red-500/10 dark:hover:bg-red-500/20",
              "text-red-600 dark:text-red-400",
              "text-sm font-semibold",
              "transition-colors duration-200",
            )}
          >
            <RotateCcw size={14} />
            <span>Clear All Filters</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
