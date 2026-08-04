"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";

export default function Logo({
  size = "default",
  onClick,
  variant = "auto", // "auto", "light", "dark"
}) {
  const sizes = {
    small: {
      icon: 28,
      title: "text-lg",
      subtitle: "text-xs",
    },
    default: {
      icon: 36,
      title: "text-xl",
      subtitle: "text-xs",
    },
    large: {
      icon: 48,
      title: "text-2xl",
      subtitle: "text-sm",
    },
  };

  const s = sizes[size] || sizes.default;

  // Color variants
  const textColors = {
    auto: "text-gray-900 dark:text-white", // Auto based on theme
    light: "text-white", // Always white
    dark: "text-gray-900", // Always dark
  };

  const subtitleColors = {
    auto: "text-gray-500 dark:text-gray-400",
    light: "text-gray-300",
    dark: "text-gray-500",
  };

  return (
    <Link href="/" onClick={onClick} className="focus-visible:outline-none">
      <motion.div
        className="flex items-center gap-2.5 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Logo Icon */}
        <div
          className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-glow group-hover:shadow-yellow-glow-lg transition-shadow duration-300 flex-shrink-0"
          style={{ width: s.icon, height: s.icon }}
        >
          {/* Letter K */}
          <span
            className="font-black text-gray-900 leading-none select-none"
            style={{ fontSize: s.icon * 0.5 }}
          >
            K
          </span>

          {/* Small dot decoration */}
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900" />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              s.title,
              "font-black tracking-tight",
              textColors[variant],
            )}
          >
            Kaar
            <span className="text-yellow-500">Yab</span>
          </span>
          <span
            className={cn(
              s.subtitle,
              "font-medium tracking-wider uppercase",
              subtitleColors[variant],
            )}
          >
            Afghanistan
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
