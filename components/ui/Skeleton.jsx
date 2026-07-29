"use client";

import { cn } from "../../lib/utils.js";

/**
 * Reusable Skeleton Component (Loading Placeholder)
 *
 * VARIANTS:
 * - default   → Rectangle
 * - circle    → Circular (for avatars)
 * - text      → Text line
 * - card      → Card placeholder
 *
 * USAGE:
 *
 * // Basic rectangle
 * <Skeleton className="w-full h-8" />
 *
 * // Avatar circle
 * <Skeleton variant="circle" className="w-12 h-12" />
 *
 * // Text line
 * <Skeleton variant="text" className="w-3/4" />
 *
 * // Multiple text lines
 * <Skeleton variant="text" lines={3} />
 *
 * // Full card
 * <Skeleton variant="card" />
 */
export default function Skeleton({
  variant = "default",
  className,
  lines = 1,
  width,
  height,
  animate = true,
  ...rest
}) {
  const baseClasses = cn(
    "bg-gray-200 dark:bg-slate-700",
    animate && "animate-pulse",
  );

  const variants = {
    default: "rounded",
    circle: "rounded-full",
    text: "rounded h-3",
    card: "rounded-2xl h-64 w-full",
  };

  // For multiple text lines
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variants.text,
              // Make last line shorter for realistic look
              i === lines - 1 ? "w-3/4" : "w-full",
            )}
          />
        ))}
      </div>
    );
  }

  // For card variant
  if (variant === "card") {
    return (
      <div
        className={cn(
          "bg-white dark:bg-slate-800",
          "border border-gray-100 dark:border-slate-700",
          "rounded-2xl p-5",
          className,
        )}
      >
        {/* Header: Avatar + Badge */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={cn(baseClasses, "rounded-xl w-12 h-12 flex-shrink-0")}
          />
          <div className="flex-1 space-y-2">
            <div className={cn(baseClasses, "h-3 rounded w-20")} />
            <div className={cn(baseClasses, "h-2 rounded w-16")} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className={cn(baseClasses, "h-5 rounded w-full")} />
          <div className={cn(baseClasses, "h-5 rounded w-3/4")} />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className={cn(baseClasses, "h-3 rounded w-full")} />
          <div className={cn(baseClasses, "h-3 rounded w-5/6")} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <div className={cn(baseClasses, "h-6 rounded-full w-24")} />
          <div className={cn(baseClasses, "h-8 w-8 rounded-full")} />
        </div>
      </div>
    );
  }

  // Default rectangle or circle
  return (
    <div
      className={cn(baseClasses, variants[variant], className)}
      style={{
        width: width,
        height: height,
      }}
      {...rest}
    />
  );
}

/**
 * Skeleton Group — for showing multiple skeletons
 *
 * USAGE:
 * <SkeletonGroup count={6}>
 *   <Skeleton variant="card" />
 * </SkeletonGroup>
 */
export function SkeletonGroup({ count = 3, children, className }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{children}</div>
      ))}
    </div>
  );
}
