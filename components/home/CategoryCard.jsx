"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function CategoryCard({ category, count, index }) {
  // Dynamically get icon from lucide-react
  const IconComponent = Icons[category.icon] || Icons.Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/opportunities?category=${encodeURIComponent(category.name)}`}
        className="block group"
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "relative overflow-hidden",
            "bg-white dark:bg-slate-800",
            "border border-gray-100 dark:border-slate-700",
            "rounded-2xl p-6",
            "shadow-sm hover:shadow-2xl",
            "transition-shadow duration-300",
            "cursor-pointer",
            "h-full",
          )}
        >
          {/* Gradient Background Effect on Hover */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100",
              "bg-gradient-to-br",
              category.gradientClass,
              "transition-opacity duration-500",
            )}
          />

          {/* Decorative Corner Element */}
          <div
            className={cn(
              "absolute -top-8 -right-8 w-24 h-24 rounded-full",
              "bg-gradient-to-br",
              category.gradientClass,
              "opacity-10 group-hover:opacity-20",
              "transition-opacity duration-500",
            )}
          />

          {/* Content (relative to appear above gradient) */}
          <div className="relative z-10">
            {/* Icon Container */}
            <div className="mb-5">
              <div
                className={cn(
                  "inline-flex items-center justify-center",
                  "w-14 h-14 rounded-xl",
                  "bg-gradient-to-br",
                  category.gradientClass,
                  "shadow-lg",
                  "group-hover:scale-110 group-hover:rotate-3",
                  "transition-transform duration-300",
                )}
              >
                <IconComponent
                  size={26}
                  className="text-white"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Category Name */}
            <h3
              className={cn(
                "text-xl font-bold",
                "text-gray-900 dark:text-white",
                "group-hover:text-white",
                "mb-2",
                "transition-colors duration-300",
              )}
            >
              {category.name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-sm mb-5",
                "text-gray-600 dark:text-gray-400",
                "group-hover:text-white/90",
                "transition-colors duration-300",
                "line-clamp-2 min-h-[40px]",
              )}
            >
              {category.description}
            </p>

            {/* Bottom Row: Count + Arrow */}
            <div className="flex items-center justify-between">
              {/* Count Badge */}
              <div
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "px-3 py-1 rounded-full",
                  "bg-gray-100 dark:bg-slate-700",
                  "group-hover:bg-white/20",
                  "transition-colors duration-300",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold",
                    "text-gray-700 dark:text-gray-300",
                    "group-hover:text-white",
                    "transition-colors duration-300",
                  )}
                >
                  {count}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    "text-gray-500 dark:text-gray-400",
                    "group-hover:text-white/80",
                    "transition-colors duration-300",
                  )}
                >
                  {count === 1 ? "opportunity" : "opportunities"}
                </span>
              </div>

              {/* Arrow Icon */}
              <motion.div
                whileHover={{ rotate: 45 }}
                className={cn(
                  "w-9 h-9 rounded-full",
                  "bg-gray-100 dark:bg-slate-700",
                  "group-hover:bg-white",
                  "flex items-center justify-center",
                  "transition-colors duration-300",
                )}
              >
                <ArrowUpRight
                  size={16}
                  className={cn(
                    "text-gray-600 dark:text-gray-300",
                    "group-hover:text-gray-900",
                    "transition-colors duration-300",
                  )}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
