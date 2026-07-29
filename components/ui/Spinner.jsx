"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Spinner Component
 *
 * SIZES:
 * - xs  → 16px
 * - sm  → 24px
 * - md  → 32px (default)
 * - lg  → 48px
 * - xl  → 64px
 *
 * COLORS:
 * - yellow  → Yellow (default)
 * - blue    → Blue
 * - white   → White
 * - gray    → Gray
 * - current → Current text color
 *
 * USAGE:
 *
 * // Basic
 * <Spinner />
 *
 * // With text
 * <Spinner size="lg" text="Loading opportunities..." />
 *
 * // Different color
 * <Spinner color="blue" size="md" />
 *
 * // Full page loading
 * <Spinner fullPage text="Please wait..." />
 *
 * // Inside button (small)
 * <Spinner size="xs" color="current" />
 */
export default function Spinner({
  size = "md",
  color = "yellow",
  text,
  fullPage = false,
  className,
}) {
  const sizes = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colors = {
    yellow: "border-yellow-500/20 border-t-yellow-500",
    blue: "border-blue-500/20 border-t-blue-500",
    white: "border-white/20 border-t-white",
    gray: "border-gray-300 border-t-gray-600",
    current: "border-current/20 border-t-current",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const spinner = (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Spinner Circle */}
      <div
        className={cn("rounded-full animate-spin", sizes[size], colors[color])}
      />

      {/* Optional Text */}
      {text && (
        <p
          className={cn(
            "font-medium text-gray-600 dark:text-gray-400",
            textSizes[size],
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Full page loading
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {spinner}
        </motion.div>
      </div>
    );
  }

  return spinner;
}

/**
 * Inline Spinner — for use inside buttons and small spaces
 */
export function InlineSpinner({ size = "xs", color = "current", className }) {
  return <Spinner size={size} color={color} className={className} />;
}

/**
 * Overlay Spinner — covers a container with loading state
 */
export function OverlaySpinner({ text = "Loading...", className }) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        "bg-white/80 dark:bg-slate-900/80",
        "backdrop-blur-sm",
        "flex items-center justify-center",
        "z-50 rounded-2xl",
        className,
      )}
    >
      <Spinner size="lg" text={text} />
    </div>
  );
}
