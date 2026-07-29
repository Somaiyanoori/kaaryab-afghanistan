"use client";

import { motion } from "framer-motion";
import Spinner from "../ui/Spinner.jsx";
import { cn } from "../../lib/utils.js";

/**
 * LoadingState — Reusable loading UI for sections/pages
 *
 * USAGE:
 *
 * // Basic
 * <LoadingState />
 *
 * // With custom message
 * <LoadingState title="Loading opportunities..." />
 *
 * // With description
 * <LoadingState
 *   title="Generating your CV"
 *   description="This might take a few seconds..."
 * />
 *
 * // Different sizes
 * <LoadingState size="sm" />  // Small
 * <LoadingState size="lg" />  // Large
 *
 * // Full page mode
 * <LoadingState fullPage title="Loading..." />
 */
export default function LoadingState({
  title = "Loading...",
  description,
  size = "md",
  fullPage = false,
  className,
}) {
  const spinnerSizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  const paddings = {
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
  };

  const titleSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center",
        paddings[size],
        className,
      )}
    >
      {/* Spinner */}
      <Spinner size={spinnerSizes[size]} color="yellow" />

      {/* Title */}
      <p
        className={cn(
          "font-semibold text-gray-900 dark:text-white mt-4",
          titleSizes[size],
        )}
      >
        {title}
      </p>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
          {description}
        </p>
      )}
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
}
