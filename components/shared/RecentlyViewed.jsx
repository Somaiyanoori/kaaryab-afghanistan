"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, Trash2, Eye, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatRelativeDate, getCategoryColors, cn } from "../../lib/utils.js";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed.js";
import DeadlineBadge from "../opportunities/DeadlineBadge.jsx";

// ============================================
// COMPACT CARD (Cleaner Design)
// ============================================
function RecentCard({ item, onRemove, index }) {
  const colors = getCategoryColors(item.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/opportunities/${item.slug || item.id}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden",
            "bg-white dark:bg-slate-800",
            "border border-gray-100 dark:border-slate-700",
            "hover:border-yellow-500 dark:hover:border-yellow-500",
            "rounded-xl",
            "transition-all duration-200",
            "hover:shadow-md",
          )}
        >
          {/* Category color strip on left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: colors.solidGradient }}
          />

          {/* Card Content */}
          <div className="p-3 pl-4">
            <div className="flex items-start gap-2.5">
              {/* Organization Avatar */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm"
                style={{ background: colors.solidGradient }}
              >
                {item.organization?.charAt(0) || "?"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </p>

                {/* Organization + Location */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.organization}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">
                        ·
                      </span>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <MapPin size={9} className="text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.location}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Deadline + Viewed Time */}
                <div className="flex items-center justify-between mt-2 gap-2">
                  <DeadlineBadge deadline={item.deadline} size="sm" />

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Eye size={9} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {formatRelativeDate(item.viewedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={14} className="text-yellow-500" />
          </div>
        </div>
      </Link>

      {/* Remove Button (visible on hover) */}
      <motion.button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item.id);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "absolute -top-1.5 -right-1.5",
          "w-5 h-5 rounded-full",
          "bg-red-500 hover:bg-red-600",
          "text-white",
          "flex items-center justify-center",
          "shadow-md",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200",
          "z-10",
        )}
        aria-label="Remove"
      >
        <X size={10} strokeWidth={3} />
      </motion.button>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function RecentlyViewed({ maxShow = 4 }) {
  const [showAll, setShowAll] = useState(false);
  const {
    recentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    hasRecentlyViewed,
  } = useRecentlyViewed();

  if (!hasRecentlyViewed) return null;

  const displayed = showAll ? recentlyViewed : recentlyViewed.slice(0, maxShow);

  const remaining = recentlyViewed.length - maxShow;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white dark:bg-slate-800",
        "border border-gray-100 dark:border-slate-700",
        "shadow-sm",
      )}
    >
      {/* Header - COMPACT */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        {/* Left: Icon + Title in ONE line */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Clock size={12} className="text-white" strokeWidth={2.5} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              Recently Viewed
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              {recentlyViewed.length}{" "}
              {recentlyViewed.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearRecentlyViewed}
          className={cn(
            "flex-shrink-0",
            "w-7 h-7 rounded-lg",
            "flex items-center justify-center",
            "text-gray-400 dark:text-gray-500",
            "hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10",
            "transition-colors duration-200",
          )}
          title="Clear all"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Cards List */}
      <div className="p-3 space-y-2">
        <AnimatePresence mode="popLayout">
          {displayed.map((item, index) => (
            <RecentCard
              key={item.id}
              item={item}
              onRemove={removeFromRecentlyViewed}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less */}
      {recentlyViewed.length > maxShow && (
        <div className="px-3 pb-3">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "w-full flex items-center justify-center gap-1.5",
              "py-2 rounded-lg",
              "bg-gray-50 dark:bg-slate-700/50",
              "hover:bg-yellow-50 dark:hover:bg-yellow-500/10",
              "border border-gray-100 dark:border-slate-700",
              "hover:border-yellow-500",
              "text-xs font-semibold",
              "text-gray-600 dark:text-gray-400",
              "hover:text-yellow-600 dark:hover:text-yellow-400",
              "transition-all duration-200",
            )}
          >
            {showAll ? (
              <span>Show Less</span>
            ) : (
              <>
                <span>Show {remaining} More</span>
                <ChevronRight size={12} />
              </>
            )}
          </motion.button>
        </div>
      )}
    </motion.section>
  );
}
