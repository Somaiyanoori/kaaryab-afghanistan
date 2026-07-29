"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

/**
 * ErrorState — Reusable error UI for sections/pages
 *
 * USAGE:
 *
 * // Basic
 * <ErrorState />
 *
 * // With custom message
 * <ErrorState
 *   title="Failed to load"
 *   description="Something went wrong"
 * />
 *
 * // With retry action
 * <ErrorState
 *   title="Failed to load opportunities"
 *   description="Check your internet and try again"
 *   onRetry={handleRetry}
 * />
 *
 * // Full page mode
 * <ErrorState fullPage title="Server Error" />
 *
 * // Custom icon
 * <ErrorState icon={WifiOff} title="No Connection" />
 */
export default function ErrorState({
  icon: Icon = AlertTriangle,
  title = "Something went wrong",
  description = "An error occurred. Please try again.",
  onRetry,
  retryLabel = "Try Again",
  actionLabel,
  actionHref,
  fullPage = false,
  className,
}) {
  const content = (
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
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        className={cn(
          "w-20 h-20 rounded-2xl mb-6",
          "bg-gradient-to-br from-red-500 to-red-600",
          "flex items-center justify-center",
          "shadow-2xl",
        )}
      >
        <Icon size={40} className="text-white" strokeWidth={2} />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button
            variant="primary"
            size="md"
            icon={RefreshCw}
            onClick={onRetry}
          >
            {retryLabel}
          </Button>
        )}

        {actionLabel && actionHref && (
          <Button href={actionHref} variant="outline" size="md">
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-20">
        {content}
      </div>
    );
  }

  return content;
}
