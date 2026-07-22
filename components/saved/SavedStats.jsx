"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { isPast, parseISO, differenceInDays } from "date-fns";
import { cn } from "../../lib/utils.js";

export default function SavedStats({ savedOpportunities }) {
  // Calculate stats
  const total = savedOpportunities.length;

  const active = savedOpportunities.filter((opp) => {
    try {
      return !isPast(parseISO(opp.deadline));
    } catch {
      return true;
    }
  }).length;

  const expiringSoon = savedOpportunities.filter((opp) => {
    try {
      const days = differenceInDays(parseISO(opp.deadline), new Date());
      return days >= 0 && days <= 7;
    } catch {
      return false;
    }
  }).length;

  const expired = savedOpportunities.filter((opp) => {
    try {
      return isPast(parseISO(opp.deadline));
    } catch {
      return false;
    }
  }).length;

  const stats = [
    {
      label: "Total Saved",
      value: total,
      icon: Bookmark,
      gradient: "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Active",
      value: active,
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Expiring Soon",
      value: expiringSoon,
      icon: AlertCircle,
      gradient: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
      color: "text-red-600 dark:text-red-400",
    },
    {
      label: "Expired",
      value: expired,
      icon: Clock,
      gradient: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
      color: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className={cn(
              "relative overflow-hidden",
              "p-4 md:p-5",
              "bg-white dark:bg-slate-800",
              "border border-gray-100 dark:border-slate-700",
              "rounded-xl",
              "shadow-sm hover:shadow-md",
              "transition-shadow duration-200",
            )}
          >
            {/* Background decoration */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 blur-xl"
              style={{ background: stat.gradient }}
            />

            <div className="relative flex items-center gap-3">
              {/* Icon */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                style={{ background: stat.gradient }}
              >
                <Icon size={18} className="text-white" strokeWidth={2.5} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div
                  className={cn("text-xl md:text-2xl font-black", stat.color)}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
