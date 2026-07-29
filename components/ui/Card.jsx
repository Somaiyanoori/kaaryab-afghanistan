"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Card Component
 *
 * VARIANTS:
 * - default   → White card with border
 * - elevated  → With shadow
 * - flat      → No shadow
 * - gradient  → Gradient background
 * - glass     → Glass effect
 *
 * USAGE:
 *
 * // Basic
 * <Card>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 *
 * // With hover effect
 * <Card hoverable>
 *   Content
 * </Card>
 *
 * // With padding size
 * <Card padding="lg" variant="elevated">
 *   Content
 * </Card>
 *
 * // As clickable link
 * <Card href="/somewhere" hoverable>
 *   Click me
 * </Card>
 */
export default function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  href,
  onClick,
  className,
  as: Component = "div",
  ...rest
}) {
  // Variant styles
  const variants = {
    default: cn(
      "bg-white dark:bg-slate-800",
      "border border-gray-100 dark:border-slate-700",
    ),
    elevated: cn(
      "bg-white dark:bg-slate-800",
      "border border-gray-100 dark:border-slate-700",
      "shadow-md",
    ),
    flat: cn("bg-gray-50 dark:bg-slate-800/50"),
    gradient: cn(
      "bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-blue-500/10",
      "border border-yellow-500/20",
    ),
    glass: cn("bg-white/10 backdrop-blur-md", "border border-white/20"),
  };

  // Padding sizes
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
    xl: "p-8",
  };

  // Base classes
  const baseClasses = cn(
    "rounded-2xl",
    "transition-all duration-200",
    variants[variant],
    paddings[padding],
    hoverable && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
    className,
  );

  // If href provided, render as link with motion
  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={hoverable ? { y: -4 } : {}}
        className={baseClasses}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  // If onClick or hoverable, use motion.div
  if (onClick || hoverable) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={hoverable ? { y: -4 } : {}}
        className={baseClasses}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  // Static card
  return (
    <Component className={baseClasses} {...rest}>
      {children}
    </Component>
  );
}
