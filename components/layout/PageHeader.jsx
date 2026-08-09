"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function PageHeader({
  title,
  highlightedText,
  description,
  badge,
  badgeIcon: BadgeIcon,
  badgeColor = "yellow",
  backHref,
  backLabel = "Back",
  actions,
  centered = false,
  showGrid = false,
  size = "md",
  className,
  children,
}) {
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

  const paddings = {
    sm: "pt-28 pb-8 md:pt-32 md:pb-10",
    md: "pt-32 pb-12 md:pt-40 md:pb-16",
    lg: "pt-32 pb-16 md:pt-40 md:pb-24",
  };

  const titleSizes = {
    sm: "text-2xl sm:text-3xl md:text-4xl",
    md: "text-3xl sm:text-4xl md:text-5xl",
    lg: "text-4xl sm:text-5xl md:text-6xl",
  };

  return (
    <section
      className={cn(
        "relative",
        "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900",
        paddings[size],
        className,
      )}
    >
      {/* Background decorations - wrapped separately with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {showGrid && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        )}
      </div>

      {/* Content - NO overflow-hidden here */}
      <div className="relative container-custom">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>{backLabel}</span>
          </Link>
        )}

        {centered ? (
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
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

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-gray-300 max-w-2xl"
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 w-full relative"
                style={{ zIndex: 40 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        ) : (
          <div
            className={cn(
              actions
                ? "flex items-center justify-between flex-wrap gap-4"
                : "max-w-3xl",
            )}
          >
            <div>
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

              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base md:text-lg text-gray-300"
                >
                  {description}
                </motion.p>
              )}

              {children && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 relative"
                  style={{ zIndex: 100 }}
                >
                  {children}
                </motion.div>
              )}
            </div>

            {actions && (
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
        )}
      </div>
    </section>
  );
}
