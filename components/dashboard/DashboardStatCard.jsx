"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function DashboardStatCard({
  label,
  value,
  icon: Icon,
  gradient,
  trend,
  trendValue,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative overflow-hidden",
        "p-5",
        "bg-white dark:bg-slate-800",
        "border border-gray-100 dark:border-slate-700",
        "rounded-2xl",
        "shadow-sm hover:shadow-md",
        "transition-shadow duration-200",
      )}
    >
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-2xl"
        style={{ background: gradient }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: gradient }}
          >
            <Icon size={22} className="text-white" strokeWidth={2.5} />
          </div>

          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                trend === "up"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
              )}
            >
              {trend === "up" ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
          {value}
        </div>

        {/* Label */}
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
