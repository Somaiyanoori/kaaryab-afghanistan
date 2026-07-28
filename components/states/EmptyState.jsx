"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SearchX, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils.js";
import Button from "../ui/Button.jsx";
export default function EmptyState({
  icon: Icon = SearchX,
  title = "No results found",
  description = "Try adjusting your search or filters",
  actionLabel,
  actionHref,
  onAction,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center",
        "py-16 px-4",
        className,
      )}
    >
      {/* Animated Icon */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "w-20 h-20 rounded-2xl mb-6",
          "bg-gradient-to-br from-yellow-500 to-orange-500",
          "flex items-center justify-center",
          "shadow-2xl",
          "relative",
        )}
      >
        <Icon size={40} className="text-white" strokeWidth={1.5} />
        <div className="absolute -top-1 -right-1">
          <Sparkles size={20} className="text-yellow-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && (actionHref || onAction) && (
        <Button
          href={actionHref}
          variant="primary"
          size="md"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
