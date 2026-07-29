"use client";

import { cn } from "../../lib/utils.js";

/**
 * Reusable Badge Component with STRONGER backgrounds
 */
export default function Badge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  dot = false,
  pulse = false,
  className,
  ...rest
}) {
  // Variant styles — STRONGER backgrounds now
  const variants = {
    default: cn(
      "bg-gray-100 text-gray-700 border-gray-200",
      "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
    ),
    primary: cn(
      "bg-yellow-100 text-yellow-800 border-yellow-300",
      "dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40",
    ),
    success: cn(
      "bg-green-100 text-green-800 border-green-300",
      "dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40",
    ),
    warning: cn(
      "bg-amber-100 text-amber-800 border-amber-300",
      "dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40",
    ),
    danger: cn(
      "bg-red-100 text-red-800 border-red-300",
      "dark:bg-red-500 dark:text-white dark:border-red-500",
    ),
    info: cn(
      "bg-blue-100 text-blue-800 border-blue-300",
      "dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40",
    ),
    purple: cn(
      "bg-purple-100 text-purple-800 border-purple-300",
      "dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/40",
    ),
    pink: cn(
      "bg-pink-100 text-pink-800 border-pink-300",
      "dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/40",
    ),
    teal: cn(
      "bg-teal-100 text-teal-800 border-teal-300",
      "dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/40",
    ),
    // SOLID = gradient with white text
    solid: cn(
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "text-white border-transparent",
      "shadow-md",
    ),
  };

  // Dot colors
  const dotColors = {
    default: "bg-gray-500",
    primary: "bg-yellow-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    teal: "bg-teal-500",
    solid: "bg-white",
  };

  // Size styles
  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 14,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center",
        "font-semibold rounded-full",
        "border",
        "transition-all duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            dotColors[variant],
            pulse && "animate-pulse",
          )}
        />
      )}

      {/* Icon */}
      {Icon && (
        <Icon
          size={iconSizes[size]}
          className={cn("flex-shrink-0", pulse && "animate-pulse")}
        />
      )}

      {/* Text */}
      <span>{children}</span>
    </span>
  );
}
