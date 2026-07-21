"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlightedText,
  description,
  align = "center",
  className,
}) {
  const alignClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        alignClasses[align],
        className,
      )}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2",
            "px-4 py-1.5 mb-4",
            "bg-gradient-to-r from-yellow-500/10 to-orange-500/10",
            "dark:from-yellow-500/20 dark:to-orange-500/20",
            "border border-yellow-500/30",
            "rounded-full",
          )}
        >
          {BadgeIcon && (
            <BadgeIcon
              size={14}
              className="text-yellow-600 dark:text-yellow-400"
            />
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight max-w-3xl"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {title}{" "}
        {highlightedText && (
          <span className="gradient-text">{highlightedText}</span>
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
