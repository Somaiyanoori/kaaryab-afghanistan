"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Clock, Zap, ArrowRight } from "lucide-react";
import {
  differenceInHours,
  differenceInDays,
  parseISO,
  isPast,
} from "date-fns";
import { cn } from "../../lib/utils.js";

export default function DeadlineAlertBanner({
  opportunities = [],
  onFilterExpiring,
}) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const dismissedAt = localStorage.getItem("kaaryab_banner_dismissed");
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt);
      const hoursSince = (new Date() - dismissedDate) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
    localStorage.setItem("kaaryab_banner_dismissed", new Date().toISOString());
  };

  const handleBannerClick = () => {
    if (onFilterExpiring) {
      onFilterExpiring();
    }
  };

  // Filter expiring
  const expiringIn24Hours = opportunities.filter((opp) => {
    try {
      const deadline = parseISO(opp.deadline);
      if (isPast(deadline)) return false;
      const hours = differenceInHours(deadline, new Date());
      return hours >= 0 && hours <= 24;
    } catch {
      return false;
    }
  });

  const expiringIn48Hours = opportunities.filter((opp) => {
    try {
      const deadline = parseISO(opp.deadline);
      if (isPast(deadline)) return false;
      const hours = differenceInHours(deadline, new Date());
      return hours > 24 && hours <= 48;
    } catch {
      return false;
    }
  });

  const expiringIn7Days = opportunities.filter((opp) => {
    try {
      const deadline = parseISO(opp.deadline);
      if (isPast(deadline)) return false;
      const days = differenceInDays(deadline, new Date());
      return days >= 0 && days <= 7;
    } catch {
      return false;
    }
  });

  const urgent24 = expiringIn24Hours.length;
  const urgent48 = expiringIn48Hours.length;
  const urgentWeek = expiringIn7Days.length;

  if (!mounted || isDismissed) return null;
  if (urgentWeek === 0) return null;

  const getMessage = () => {
    if (urgent24 > 0) {
      return {
        icon: Zap,
        text: `${urgent24} opportunit${urgent24 === 1 ? "y expires" : "ies expire"} within 24 hours`,
        sub: "Apply now before it's too late",
        color: "red",
        count: urgent24,
      };
    }
    if (urgent48 > 0) {
      return {
        icon: AlertCircle,
        text: `${urgent48} opportunit${urgent48 === 1 ? "y expires" : "ies expire"} within 48 hours`,
        sub: `${urgentWeek} total expiring this week`,
        color: "orange",
        count: urgent48,
      };
    }
    return {
      icon: Clock,
      text: `${urgentWeek} opportunit${urgentWeek === 1 ? "y is" : "ies are"} expiring this week`,
      sub: "Click to see them",
      color: "yellow",
      count: urgentWeek,
    };
  };

  const message = getMessage();
  const Icon = message.icon;

  const colorSchemes = {
    red: {
      bg: "bg-gradient-to-r from-red-600 via-red-500 to-red-600",
      text: "text-white",
      sub: "text-red-100",
      countBg: "bg-white text-red-600",
      dismiss: "hover:bg-red-700 text-white",
      iconBg: "bg-white/20",
      hoverGlow: "hover:shadow-red-500/40",
    },
    orange: {
      bg: "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500",
      text: "text-white",
      sub: "text-orange-50",
      countBg: "bg-white text-orange-600",
      dismiss: "hover:bg-orange-600 text-white",
      iconBg: "bg-white/20",
      hoverGlow: "hover:shadow-orange-500/40",
    },
    yellow: {
      bg: "bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500",
      text: "text-gray-900",
      sub: "text-gray-800",
      countBg: "bg-gray-900 text-white",
      dismiss: "hover:bg-yellow-600 text-gray-900",
      iconBg: "bg-gray-900/10",
      hoverGlow: "hover:shadow-yellow-500/40",
    },
  };

  const colors = colorSchemes[message.color];

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          onClick={handleBannerClick}
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "shadow-lg hover:shadow-xl",
            "cursor-pointer",
            "transition-all duration-300",
            "hover:scale-[1.01]",
            colors.bg,
            colors.hoverGlow,
            "mb-6",
            "group",
          )}
          role="alert"
        >
          <div className="px-4 md:px-5 py-3">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  colors.iconBg,
                  message.color === "red" && "animate-pulse",
                )}
              >
                <Icon size={18} className={colors.text} strokeWidth={2.5} />
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-x-2 gap-y-0">
                  <span
                    className={cn(
                      "text-sm md:text-base font-bold",
                      colors.text,
                    )}
                  >
                    {message.text}
                  </span>
                  <span
                    className={cn(
                      "text-xs md:text-sm hidden sm:inline",
                      colors.sub,
                    )}
                  >
                    · {message.sub}
                  </span>
                </div>
              </div>

              {/* Count Badge */}
              <div
                className={cn(
                  "flex-shrink-0 hidden sm:flex items-center gap-1.5",
                  "px-3 py-1 rounded-full",
                  "text-xs font-black",
                  "group-hover:scale-110 transition-transform duration-200",
                  colors.countBg,
                )}
              >
                <span>{message.count}</span>
                <ArrowRight
                  size={12}
                  strokeWidth={3}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>

              {/* Dismiss Button */}
              <motion.button
                onClick={handleDismiss}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg",
                  "flex items-center justify-center",
                  "transition-colors duration-200",
                  colors.dismiss,
                )}
                aria-label="Dismiss alert"
              >
                <X size={14} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>

          {/* Emergency animated line */}
          {message.color === "red" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "50%" }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
