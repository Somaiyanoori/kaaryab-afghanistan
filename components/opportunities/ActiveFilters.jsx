"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function ActiveFilters({ filters, onRemove, onClearAll }) {
  const activeFilters = [];

  if (filters.search) {
    activeFilters.push({
      key: "search",
      label: `"${filters.search}"`,
      type: "Search",
    });
  }

  if (filters.category && filters.category !== "All") {
    activeFilters.push({
      key: "category",
      label: filters.category,
      type: "Category",
      value: "All",
    });
  }

  if (filters.location && filters.location !== "All") {
    activeFilters.push({
      key: "location",
      label: filters.location,
      type: "Location",
      value: "All",
    });
  }

  if (filters.type && filters.type !== "All") {
    activeFilters.push({
      key: "type",
      label: filters.type,
      type: "Type",
      value: "All",
    });
  }

  if (filters.deadline && filters.deadline !== "all") {
    const deadlineLabels = {
      week: "This Week",
      month: "This Month",
      quarter: "Next 3 Months",
    };
    activeFilters.push({
      key: "deadline",
      label: deadlineLabels[filters.deadline] || filters.deadline,
      type: "Deadline",
      value: "all",
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Active filters:
      </span>

      <AnimatePresence>
        {activeFilters.map((filter) => (
          <motion.div
            key={filter.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "inline-flex items-center gap-1.5",
              "pl-3 pr-1 py-1",
              "bg-yellow-100 dark:bg-yellow-500/20",
              "text-yellow-800 dark:text-yellow-300",
              "text-xs font-semibold",
              "rounded-full",
              "border border-yellow-300 dark:border-yellow-500/30",
            )}
          >
            <span className="opacity-70">{filter.type}:</span>
            <span>{filter.label}</span>
            <button
              onClick={() => onRemove(filter.key, filter.value || "")}
              className="w-5 h-5 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-500/30 flex items-center justify-center transition-colors ml-1"
              aria-label={`Remove ${filter.type} filter`}
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={onClearAll}
        className="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
