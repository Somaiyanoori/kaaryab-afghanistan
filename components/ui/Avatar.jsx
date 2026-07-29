"use client";

import { cn, getInitials } from "../../lib/utils.js";

/**
 * Reusable Avatar Component
 *
 * SIZES:
 * - xs  → 24px
 * - sm  → 32px
 * - md  → 40px (default)
 * - lg  → 48px
 * - xl  → 64px
 * - 2xl → 80px
 *
 * USAGE:
 *
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // With initials (auto from name)
 * <Avatar name="Ahmad Karimi" />
 *
 * // With custom gradient
 * <Avatar
 *   name="Fatima"
 *   gradient="linear-gradient(135deg, #EC4899, #BE185D)"
 * />
 *
 * // With status indicator
 * <Avatar name="Omar" status="online" />
 *
 * // With ring
 * <Avatar name="Zainab" ring />
 */

// Predefined gradients for random avatar colors
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #EAB308 0%, #F97316 100%)",
  "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
  "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
  "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
  "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
  "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
  "linear-gradient(135deg, #F97316 0%, #C2410C 100%)",
  "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
];

// Generate consistent gradient from name
const getGradientFromName = (name) => {
  if (!name) return AVATAR_GRADIENTS[0];
  const charSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[charSum % AVATAR_GRADIENTS.length];
};

export default function Avatar({
  src,
  alt,
  name,
  size = "md",
  gradient,
  status,
  ring = false,
  className,
  ...rest
}) {
  // Size styles
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
    "2xl": "w-5 h-5",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  // Get initials from name
  const initials = name ? getInitials(name) : "??";

  // Get gradient
  const avatarGradient = gradient || getGradientFromName(name);

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "flex items-center justify-center",
          "rounded-full",
          "font-bold text-white",
          "shadow-md",
          "overflow-hidden",
          ring &&
            "ring-2 ring-white dark:ring-slate-800 ring-offset-2 ring-offset-transparent",
          sizes[size],
          className,
        )}
        style={!src ? { background: avatarGradient } : undefined}
        {...rest}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, hide it (fallback to initials)
              e.target.style.display = "none";
              e.target.parentElement.style.background = avatarGradient;
              e.target.parentElement.innerText = initials;
            }}
          />
        ) : (
          <span className="drop-shadow-sm">{initials}</span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0",
            "rounded-full",
            "border-2 border-white dark:border-slate-800",
            statusColors[status],
            statusSizes[size],
          )}
        />
      )}
    </div>
  );
}
