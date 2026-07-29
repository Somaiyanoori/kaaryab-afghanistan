"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * PageHeader - Reusable hero header for all pages
 *
 * USAGE:
 *
 * // Basic
 * <PageHeader
 *   title="Dashboard"
 *   description="Manage your opportunities"
 * />
 *
 * // With badge
 * <PageHeader
 *   badge="Analytics & Management"
 *   badgeIcon={BarChart3}
 *   title="Dashboard"
 *   description="Manage opportunities and view analytics"
 * />
 *
 * // With highlighted text in title
 * <PageHeader
 *   badge="Free CV Builder"
 *   badgeIcon={Sparkles}
 *   title="Build Your"
 *   highlightedText="CV"
 *   description="Create a professional resume in minutes"
 * />
 *
 * // With back link
 * <PageHeader
 *   backHref="/dashboard"
 *   backLabel="Back to Dashboard"
 *   title="Edit Opportunity"
 * />
 *
 * // With actions on right
 * <PageHeader
 *   title="Dashboard"
 *   description="Manage opportunities"
 *   actions={
 *     <Button href="/add-opportunity" variant="primary" icon={Plus}>
 *       Add Opportunity
 *     </Button>
 *   }
 * />
 *
 * // Centered layout (like About/Contact)
 * <PageHeader
 *   badge="Our Story"
 *   badgeIcon={Heart}
 *   title="About"
 *   highlightedText="KaarYab"
 *   description="Our mission and story"
 *   centered
 * />
 *
 * // With grid pattern background
 * <PageHeader
 *   title="Contact Us"
 *   showGrid
 * />
 */
export default function PageHeader({
  // Content
  title,
  highlightedText,
  description,
  badge,
  badgeIcon: BadgeIcon,
  badgeColor = "yellow",

  // Back navigation
  backHref,
  backLabel = "Back",

  // Right side actions (button, etc)
  actions,

  // Layout options
  centered = false,
  showGrid = false,

  // Size options
  size = "md", // "sm" | "md" | "lg"

  className,
  children,
}) {
  // Badge colors
  const badgeColors = {
    yellow: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    green: "bg-green-500/20 border-green-500/30 text-green-300",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    red: "bg-red-500/20 border-red-500/30 text-red-300",
  };

  const badgeIconColors = {
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
    red: "text-red-400",
  };

  // Size padding
  const paddings = {
    sm: "pt-28 pb-8 md:pt-32 md:pb-10",
    md: "pt-32 pb-12 md:pt-40 md:pb-16",
    lg: "pt-32 pb-16 md:pt-40 md:pb-24",
  };

  // Title sizes
  const titleSizes = {
    sm: "text-2xl sm:text-3xl md:text-4xl",
    md: "text-3xl sm:text-4xl md:text-5xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900",
        paddings[size],
        className,
      )}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Optional Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      )}

      <div className="relative container-custom">
        {/* Back Link */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>{backLabel}</span>
          </Link>
        )}

        {/* Main Layout: Split (title left + actions right) OR Centered */}
        <div
          className={cn(
            centered
              ? "text-center max-w-3xl mx-auto"
              : actions
                ? "flex items-center justify-between flex-wrap gap-4"
                : "max-w-3xl",
          )}
        >
          {/* Left/Center: Content */}
          <div className={cn(centered && "flex flex-col items-center")}>
            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 mb-4",
                  "border rounded-full",
                  badgeColors[badgeColor],
                )}
              >
                {BadgeIcon && (
                  <BadgeIcon
                    size={14}
                    className={badgeIconColors[badgeColor]}
                  />
                )}
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Title */}
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "font-black text-white mb-4 leading-tight",
                  titleSizes[size],
                )}
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {title}
                {highlightedText && (
                  <>
                    {" "}
                    <span className="gradient-text">{highlightedText}</span>
                  </>
                )}
              </motion.h1>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "text-base md:text-lg text-gray-300",
                  centered && "max-w-2xl",
                )}
              >
                {description}
              </motion.p>
            )}

            {/* Custom children content */}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6"
              >
                {children}
              </motion.div>
            )}
          </div>

          {/* Right: Actions */}
          {actions && !centered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 flex-wrap"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
