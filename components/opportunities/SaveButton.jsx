"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import Tooltip from "../ui/Tooltip.jsx";
import { useSavedStore } from "../../store/index.js";
import { saveOpportunityDB, removeSavedOpportunityDB } from "../../lib/db.js";
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
  const [isSyncing, setIsSyncing] = useState(false);

  // Clerk user
  const { user, isLoaded } = useUser();

  // Local store (Zustand)
  const { isSaved, saveOpportunity, unsaveOpportunity } = useSavedStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  const saved = mounted ? isSaved(opportunity.id) : false;

  // Toggle save
  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If not signed in → save locally only
    if (isLoaded && !user) {
      if (saved) {
        unsaveOpportunity(opportunity.id);
        toast("Removed from saved", {
          icon: "📌",
          duration: 2000,
        });
      } else {
        saveOpportunity(opportunity);
        toast.success("Saved locally! Sign in to sync across devices.", {
          duration: 3000,
        });
      }

      if (onSaveChange) onSaveChange(!saved);
      return;
    }

    // Signed in → save to BOTH local store AND Supabase
    setIsAnimating(true);
    setIsSyncing(true);

    try {
      if (saved) {
        // UNSAVE - Remove from local store (optimistic) then Supabase
        unsaveOpportunity(opportunity.id);

        if (user) {
          await removeSavedOpportunityDB(user.id, opportunity.id);
        }

        toast("Removed from saved", {
          icon: "📌",
          duration: 2000,
        });
      } else {
        // SAVE - Save to local store (optimistic) then Supabase
        saveOpportunity(opportunity);

        if (user) {
          await saveOpportunityDB(user.id, opportunity);
        }

        toast.success("Saved to your list! ✓", {
          duration: 2000,
        });
      }

      if (onSaveChange) onSaveChange(!saved);
    } catch (error) {
      console.error("Save error:", error);

      // Rollback optimistic update on error
      if (saved) {
        saveOpportunity(opportunity);
      } else {
        unsaveOpportunity(opportunity.id);
      }

      toast.error("Failed to save. Please try again.");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // Size classes
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

  // Variant classes
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

  // Button JSX
  const button = (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: isSyncing ? 1 : 1.1 }}
      whileTap={{ scale: isSyncing ? 1 : 0.9 }}
      disabled={isSyncing}
      className={cn(
        "relative flex items-center justify-center",
        "rounded-full",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
        isSyncing && "opacity-70 cursor-wait",
        sizeClasses[size],
        variantClasses[variant],
      )}
      aria-label={saved ? "Remove from saved" : "Save opportunity"}
    >
      {/* Syncing spinner */}
      {isSyncing ? (
        <div
          className={cn(
            "border-2 border-yellow-500 border-t-transparent rounded-full animate-spin",
            size === "small" ? "w-3 h-3" : "w-4 h-4",
          )}
        />
      ) : (
        /* Bookmark icon with animation */
        <AnimatePresence mode="wait" initial={false}>
          {saved ? (
            <motion.div
              key="saved"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
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
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <Bookmark
                size={iconSize[size]}
                className="text-gray-500 dark:text-gray-400"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Particle burst effect on save */}
      <AnimatePresence>
        {isAnimating && !saved && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-500 rounded-full pointer-events-none"
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

  // Tooltip wrapper
  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip
      content={
        isSyncing
          ? "Saving..."
          : saved
            ? "Remove from saved"
            : "Save opportunity"
      }
      position="left"
      color={saved ? "yellow" : "default"}
    >
      {button}
    </Tooltip>
  );
}
