"use client";

import { motion } from "framer-motion";
import { categories } from "../../data/opportunities.js";
import { cn } from "../../lib/utils.js";

export default function CategoryTabs({
  selectedCategory,
  onCategoryChange,
  opportunityCounts,
}) {
  const allTab = {
    id: "all",
    name: "All",
    slug: "all",
    icon: "LayoutGrid",
  };

  const tabs = [allTab, ...categories];

  return (
    <div className="relative">
      {/* Scrollable Container */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-2 min-w-min pb-1">
          {tabs.map((tab) => {
            const isActive =
              selectedCategory === tab.name ||
              (tab.name === "All" && selectedCategory === "All");
            const count =
              tab.name === "All"
                ? Object.values(opportunityCounts || {}).reduce(
                    (a, b) => a + b,
                    0,
                  )
                : opportunityCounts?.[tab.name] || 0;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onCategoryChange(tab.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center gap-2",
                  "px-4 py-2.5 rounded-xl",
                  "text-sm font-semibold",
                  "whitespace-nowrap",
                  "transition-all duration-200",
                  "border",
                  isActive
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-yellow-500",
                )}
              >
                <span>{tab.name}</span>

                {/* Count Badge */}
                <span
                  className={cn(
                    "inline-flex items-center justify-center",
                    "min-w-[20px] h-5 px-1.5",
                    "rounded-full",
                    "text-xs font-bold",
                    isActive
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400",
                  )}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gradient Fade on Edges (Mobile) */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
