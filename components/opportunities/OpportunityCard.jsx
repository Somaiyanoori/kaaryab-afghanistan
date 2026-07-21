"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building2, Sparkles, AlertCircle } from "lucide-react";
import CategoryBadge from "./CategoryBadge.jsx";
import DeadlineBadge from "./DeadlineBadge.jsx";
import SaveButton from "./SaveButton.jsx";
import { getCategoryColors, getInitials, cn } from "../../lib/utils.js";

export default function OpportunityCard({ opportunity, index = 0 }) {
  const colors = getCategoryColors(opportunity.category);
  const initials = getInitials(opportunity.organization);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="group h-full"
    >
      <Link
        href={`/opportunities/${opportunity.slug || opportunity.id}`}
        className="block h-full"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "relative overflow-hidden",
            "bg-white dark:bg-slate-800",
            "border border-gray-100 dark:border-slate-700",
            "rounded-2xl",
            "shadow-sm hover:shadow-xl",
            "transition-shadow duration-300",
            "h-full",
            "flex flex-col",
          )}
        >
          {/* ============================================
              Top Colored Border (based on category) — USING INLINE STYLE
          ============================================ */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: colors.solidGradient }}
          />

          {/* ============================================
              Top Corner Badges (Featured/Urgent)
          ============================================ */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
            {opportunity.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className={cn(
                  "flex items-center gap-1",
                  "px-2 py-0.5 rounded-full",
                  "bg-gradient-to-r from-yellow-500 to-orange-500",
                  "text-white text-[10px] font-bold",
                  "shadow-md",
                )}
                title="Featured Opportunity"
              >
                <Sparkles size={10} />
                <span>FEATURED</span>
              </motion.div>
            )}
            {opportunity.urgent && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className={cn(
                  "flex items-center gap-1",
                  "px-2 py-0.5 rounded-full",
                  "bg-red-500",
                  "text-white text-[10px] font-bold",
                  "shadow-md",
                )}
                title="Urgent — Apply Soon"
              >
                <AlertCircle size={10} className="animate-pulse" />
                <span>URGENT</span>
              </motion.div>
            )}
          </div>

          {/* ============================================
              Card Content
          ============================================ */}
          <div className="p-5 flex flex-col flex-1">
            {/* ============================================
                Header: Logo + Category
            ============================================ */}
            <div className="flex items-start gap-3 mb-4">
              {/* Organization Logo/Initials — USING INLINE STYLE */}
              <div
                className={cn(
                  "flex-shrink-0",
                  "w-12 h-12 rounded-xl",
                  "flex items-center justify-center",
                  "shadow-md",
                  "text-white font-bold text-base",
                  "overflow-hidden",
                )}
                style={{ background: colors.solidGradient }}
              >
                {opportunity.logo ? (
                  <img
                    src={opportunity.logo}
                    alt={opportunity.organization}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white drop-shadow-sm">{initials}</span>
                )}
              </div>

              {/* Category Badge */}
              <div className="flex-1 min-w-0 pt-1">
                <CategoryBadge category={opportunity.category} size="small" />
              </div>
            </div>

            {/* ============================================
                Title
            ============================================ */}
            <h3
              className={cn(
                "text-base md:text-lg font-bold",
                "text-gray-900 dark:text-white",
                "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
                "transition-colors duration-200",
                "mb-1.5",
                "line-clamp-2",
                "min-h-[3rem]",
              )}
            >
              {opportunity.title}
            </h3>

            {/* ============================================
                Organization Name
            ============================================ */}
            <div className="flex items-center gap-1.5 mb-3 text-gray-500 dark:text-gray-400">
              <Building2 size={12} className="flex-shrink-0" />
              <span className="text-xs truncate">
                {opportunity.organization}
              </span>
            </div>

            {/* ============================================
                Description
            ============================================ */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1 min-h-[2.5rem]">
              {opportunity.shortDesc || opportunity.description}
            </p>

            {/* ============================================
                Meta Info: Location + Type
            ============================================ */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              {/* Location */}
              <div
                className={cn(
                  "inline-flex items-center gap-1",
                  "px-2 py-0.5 rounded-md",
                  "bg-gray-100 dark:bg-slate-700",
                  "text-xs text-gray-700 dark:text-gray-300",
                )}
              >
                <MapPin size={10} />
                <span>{opportunity.location}</span>
              </div>

              {/* Work Type */}
              <div
                className={cn(
                  "inline-flex items-center",
                  "px-2 py-0.5 rounded-md",
                  "text-xs font-medium",
                  opportunity.type === "Remote" &&
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                  opportunity.type === "On-site" &&
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                  opportunity.type === "Hybrid" &&
                    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                )}
              >
                {opportunity.type}
              </div>
            </div>

            {/* ============================================
                Footer: Deadline + Save Button
            ============================================ */}
            <div
              className={cn(
                "flex items-center justify-between",
                "pt-4 mt-auto",
                "border-t border-gray-100 dark:border-slate-700",
              )}
            >
              <DeadlineBadge deadline={opportunity.deadline} size="small" />
              <SaveButton opportunity={opportunity} size="small" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
