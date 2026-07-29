"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building2, Sparkles, AlertCircle } from "lucide-react";
import CategoryBadge from "./CategoryBadge.jsx";
import DeadlineBadge from "./DeadlineBadge.jsx";
import SaveButton from "./SaveButton.jsx";
import Avatar from "../ui/Avatar.jsx";
import Badge from "../ui/Badge.jsx";
import { getCategoryColors, cn } from "../../lib/utils.js";

export default function OpportunityCard({ opportunity, index = 0 }) {
  const colors = getCategoryColors(opportunity.category);

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
          {/* Top Colored Border (on hover) */}
          <div
            className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: colors.solidGradient }}
          />

          {/* Top Corner Badges */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.8">
            {opportunity.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Badge variant="solid" size="sm" icon={Sparkles}>
                  FEATURED
                </Badge>
              </motion.div>
            )}
            {opportunity.urgent && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Badge variant="danger" size="sm" icon={AlertCircle} pulse>
                  URGENT
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Header: Logo + Category */}
            <div className="flex items-start gap-3 mb-4">
              <Avatar
                src={opportunity.logo}
                name={opportunity.organization}
                size="md"
                gradient={colors.solidGradient}
                className="!rounded-xl"
              />

              <div className="flex-1 min-w-0 pt-1">
                <CategoryBadge category={opportunity.category} size="sm" />
              </div>
            </div>

            {/* Title */}
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

            {/* Organization */}
            <div className="flex items-center gap-1.5 mb-3 text-gray-500 dark:text-gray-400">
              <Building2 size={12} className="flex-shrink-0" />
              <span className="text-xs truncate">
                {opportunity.organization}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1 min-h-[2.5rem]">
              {opportunity.shortDesc || opportunity.description}
            </p>

            {/* Meta Info: Location + Type */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
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

            {/* Footer: Deadline + Save Button */}
            <div
              className={cn(
                "flex items-center justify-between",
                "pt-4 mt-auto",
                "border-t border-gray-100 dark:border-slate-700",
              )}
            >
              <DeadlineBadge deadline={opportunity.deadline} size="sm" />
              <SaveButton opportunity={opportunity} size="small" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
