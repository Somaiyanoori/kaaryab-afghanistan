"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

/**
 * Animated Empty State Component
 *
 * Beautiful animated empty states with floating icons,
 * pulsing rings, and particles.
 *
 * USAGE:
 * <AnimatedEmptyState
 *   icon={SearchX}
 *   title="No results found"
 *   description="Try different keywords"
 *   variant="search"
 *   actionLabel="Clear Filters"
 *   onAction={handleClear}
 * />
 *
 * VARIANTS:
 * - default   → Yellow theme
 * - search    → Blue theme
 * - saved     → Pink theme
 * - error     → Red theme
 * - success   → Green theme
 */

const VARIANTS = {
  default: {
    gradient: "from-yellow-400 to-orange-500",
    ringColor: "border-yellow-500",
    particleColor: "bg-yellow-400",
    glowColor: "bg-yellow-500/20",
  },
  search: {
    gradient: "from-blue-400 to-indigo-500",
    ringColor: "border-blue-500",
    particleColor: "bg-blue-400",
    glowColor: "bg-blue-500/20",
  },
  saved: {
    gradient: "from-pink-400 to-rose-500",
    ringColor: "border-pink-500",
    particleColor: "bg-pink-400",
    glowColor: "bg-pink-500/20",
  },
  error: {
    gradient: "from-red-400 to-red-600",
    ringColor: "border-red-500",
    particleColor: "bg-red-400",
    glowColor: "bg-red-500/20",
  },
  success: {
    gradient: "from-green-400 to-emerald-500",
    ringColor: "border-green-500",
    particleColor: "bg-green-400",
    glowColor: "bg-green-500/20",
  },
};

// Fixed particle positions (not random for SSR safety)
const PARTICLES = [
  { angle: 0, distance: 60, delay: 0 },
  { angle: 45, distance: 70, delay: 0.2 },
  { angle: 90, distance: 65, delay: 0.4 },
  { angle: 135, distance: 75, delay: 0.6 },
  { angle: 180, distance: 60, delay: 0.8 },
  { angle: 225, distance: 70, delay: 1 },
  { angle: 270, distance: 65, delay: 1.2 },
  { angle: 315, distance: 75, delay: 1.4 },
];

export default function AnimatedEmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description = "Start exploring to see content here",
  variant = "default",
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  secondaryHref,
  onSecondary,
  className,
}) {
  const style = VARIANTS[variant] || VARIANTS.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center",
        "py-16 px-4 relative",
        className,
      )}
    >
      {/* Background Glow */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-80 h-80 rounded-full blur-3xl",
          style.glowColor,
        )}
      />

      {/* Icon Container with Animations */}
      <div className="relative mb-8">
        {/* Pulsing Ring 1 */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-0 rounded-full border-2",
            style.ringColor,
          )}
        />

        {/* Pulsing Ring 2 */}
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-0 rounded-full border-2",
            style.ringColor,
          )}
        />

        {/* Floating Particles */}
        {PARTICLES.map((particle, i) => {
          const x =
            Math.cos((particle.angle * Math.PI) / 180) * particle.distance;
          const y =
            Math.sin((particle.angle * Math.PI) / 180) * particle.distance;

          return (
            <motion.div
              key={i}
              className={cn(
                "absolute top-1/2 left-1/2 w-2 h-2 rounded-full",
                style.particleColor,
              )}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, x, 0],
                y: [0, y, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Main Icon Circle */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "relative",
            "w-24 h-24 md:w-28 md:h-28 rounded-full",
            "bg-gradient-to-br",
            style.gradient,
            "flex items-center justify-center",
            "shadow-2xl",
          )}
        >
          {/* Sparkle top right */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles size={20} className="text-yellow-300 drop-shadow-lg" />
          </motion.div>

          {/* Sparkle bottom left */}
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2.5,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut",
              },
            }}
            className="absolute -bottom-2 -left-2"
          >
            <Sparkles size={16} className="text-white/80 drop-shadow-lg" />
          </motion.div>

          {/* Main Icon */}
          <Icon
            size={44}
            className="text-white relative z-10 drop-shadow-lg"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Shadow beneath */}
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full bg-black/20 blur-md"
        />
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 max-w-md"
      >
        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-3"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        {(actionLabel || secondaryLabel) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {actionLabel && (actionHref || onAction) && (
              <Button
                href={actionHref}
                onClick={onAction}
                variant="primary"
                size="md"
              >
                {actionLabel}
              </Button>
            )}

            {secondaryLabel && (secondaryHref || onSecondary) && (
              <Button
                href={secondaryHref}
                onClick={onSecondary}
                variant="outline"
                size="md"
              >
                {secondaryLabel}
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Decorative dots at bottom */}
      <div className="mt-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className={cn("w-1.5 h-1.5 rounded-full", style.particleColor)}
          />
        ))}
      </div>
    </motion.div>
  );
}
