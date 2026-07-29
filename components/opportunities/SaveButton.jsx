"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";
import Tooltip from "../ui/Tooltip.jsx";
import { useSavedStore } from "../../store/index.js";
import { cn } from "../../lib/utils.js";

export default function SaveButton({
  opportunity,
  size = "default",
  variant = "default",
  onSaveChange,
  showTooltip = true,
}) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { isSaved, saveOpportunity, unsaveOpportunity } = useSavedStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  const saved = mounted ? isSaved(opportunity.id) : false;

  const handleToggle = (e) => {
    // Prevent card click when clicking save button
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);

    if (saved) {
      unsaveOpportunity(opportunity.id);
      toast.success("Removed from saved", {
        icon: "📌",
        duration: 2000,
      });
    } else {
      saveOpportunity(opportunity);
      toast.success("Saved to your list!", {
        duration: 2000,
      });
    }

    // Call callback if provided
    if (onSaveChange) {
      onSaveChange(!saved);
    }

    // Reset animation
    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-12 h-12",
  };

  const iconSize = {
    small: 14,
    default: 18,
    large: 22,
  };

  const variantClasses = {
    default: cn(
      "bg-gray-100 hover:bg-gray-200",
      "dark:bg-slate-700 dark:hover:bg-slate-600",
    ),
    ghost: cn("bg-transparent hover:bg-gray-100", "dark:hover:bg-slate-800"),
    outline: cn(
      "bg-white hover:bg-gray-50",
      "dark:bg-slate-800 dark:hover:bg-slate-700",
      "border border-gray-200 dark:border-slate-600",
    ),
  };

  const button = (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "relative flex items-center justify-center",
        "rounded-full",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
        sizeClasses[size],
        variantClasses[variant],
      )}
      aria-label={saved ? "Remove from saved" : "Save opportunity"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {saved ? (
          <motion.div
            key="saved"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <BookmarkCheck
              size={iconSize[size]}
              className="text-yellow-500 fill-yellow-500"
            />
          </motion.div>
        ) : (
          <motion.div
            key="unsaved"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Bookmark
              size={iconSize[size]}
              className="text-gray-500 dark:text-gray-400"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle burst effect on save */}
      <AnimatePresence>
        {isAnimating && !saved && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-500 rounded-full"
                initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: 0,
                  x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );

  // If tooltip is disabled, return button directly
  if (!showTooltip) {
    return button;
  }

  // Wrap with tooltip
  return (
    <Tooltip
      content={saved ? "Remove from saved" : "Save opportunity"}
      position="left"
      color={saved ? "yellow" : "default"}
    >
      {button}
    </Tooltip>
  );
}
