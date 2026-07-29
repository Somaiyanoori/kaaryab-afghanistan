"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../../lib/utils.js";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className,
  onClick,
  href,
  type = "button",
  target,
  ...rest
}) {
  // VARIANT STYLES
  const variants = {
    primary: cn(
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "hover:from-yellow-400 hover:to-orange-400",
      "text-gray-900",
      "shadow-lg hover:shadow-yellow-glow",
    ),
    secondary: cn(
      "bg-blue-600 hover:bg-blue-500",
      "text-white",
      "shadow-md hover:shadow-blue-glow",
    ),
    outline: cn(
      "bg-white dark:bg-slate-800",
      "border-2 border-gray-200 dark:border-slate-700",
      "text-gray-700 dark:text-gray-300",
      "hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400",
    ),
    ghost: cn(
      "bg-transparent",
      "text-gray-700 dark:text-gray-300",
      "hover:bg-gray-100 dark:hover:bg-slate-800",
    ),
    danger: cn(
      "bg-red-50 hover:bg-red-100",
      "dark:bg-red-500/10 dark:hover:bg-red-500/20",
      "text-red-600 dark:text-red-400",
      "border-2 border-red-200 dark:border-red-500/30",
    ),
    white: cn(
      "bg-white hover:bg-gray-100",
      "text-gray-900",
      "shadow-lg hover:shadow-xl",
    ),
    dark: cn(
      "bg-gray-900 dark:bg-white",
      "text-white dark:text-gray-900",
      "hover:bg-gray-800 dark:hover:bg-gray-100",
      "shadow-lg hover:shadow-xl",
    ),
    glass: cn(
      "bg-white/10 hover:bg-white/20",
      "backdrop-blur-sm",
      "border border-white/20 hover:border-white/30",
      "text-white",
    ),
  };
  // SIZE STYLES
  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };
  // BASE CLASSES
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "font-semibold rounded-xl",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
    "whitespace-nowrap",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    (disabled || isLoading) && "opacity-70 cursor-not-allowed",
    className,
  );

  // BUTTON CONTENT
  const buttonContent = (
    <>
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!isLoading && Icon && iconPosition === "left" && <Icon size={16} />}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === "right" && <Icon size={16} />}
    </>
  );

  // RENDER AS LINK
  if (href) {
    // External link
    if (href.startsWith("http") || target === "_blank") {
      return (
        <motion.a
          href={href}
          target={target || "_blank"}
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
          {...rest}
        >
          {buttonContent}
        </motion.a>
      );
    }

    // Internal Next.js link
    return (
      <Link href={href} className="inline-block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
          {...rest}
        >
          {buttonContent}
        </motion.div>
      </Link>
    );
  }
  // RENDER AS BUTTON (default)
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      {...rest}
    >
      {buttonContent}
    </motion.button>
  );
}
