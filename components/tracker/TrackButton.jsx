"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Check,
  Loader2,
  ChevronDown,
  Heart,
  Send,
  MessageCircle,
  Trophy,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import {
  addToTracker,
  checkIfTracked,
  updateTrackerStatus,
  removeFromTracker,
} from "../../lib/db.js";
import { cn } from "../../lib/utils.js";

const STATUS_CONFIG = {
  interested: {
    label: "Interested",
    icon: Heart,
    color: "bg-blue-500 hover:bg-blue-600 text-white",
    lightColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  },
  applied: {
    label: "Applied",
    icon: Send,
    color: "bg-purple-500 hover:bg-purple-600 text-white",
    lightColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  },
  interview: {
    label: "Interview",
    icon: MessageCircle,
    color: "bg-yellow-500 hover:bg-yellow-600 text-white",
    lightColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
  },
  accepted: {
    label: "Accepted",
    icon: Trophy,
    color: "bg-green-500 hover:bg-green-600 text-white",
    lightColor:
      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-red-500 hover:bg-red-600 text-white",
    lightColor: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  },
};

export default function TrackButton({
  opportunity,
  size = "md",
  variant = "default",
  onStatusChange,
}) {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trackerData, setTrackerData] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if this opportunity is already tracked
  useEffect(() => {
    if (!user || !opportunity?.id) return;

    const check = async () => {
      try {
        const result = await checkIfTracked(user.id, opportunity.id);
        setTrackerData(result);
      } catch (error) {
        console.error("Check tracker error:", error);
      }
    };

    check();
  }, [user, opportunity?.id]);

  const handleStatusChange = async (newStatus) => {
    if (!user) {
      toast.error("Please sign in to track applications");
      return;
    }

    setIsLoading(true);
    setIsOpen(false);

    try {
      if (trackerData) {
        // Already tracked, just update status
        const updated = await updateTrackerStatus(trackerData.id, {
          status: newStatus,
        });
        setTrackerData(updated);
        toast.success(`Moved to ${STATUS_CONFIG[newStatus].label}`);
      } else {
        // New tracking
        const result = await addToTracker(user.id, opportunity, newStatus);
        setTrackerData(result);
        toast.success(`Added to ${STATUS_CONFIG[newStatus].label} ✓`);
      }

      if (onStatusChange) onStatusChange(newStatus);
    } catch (error) {
      console.error("Track error:", error);
      toast.error("Failed to update. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!trackerData) return;

    setIsLoading(true);
    setIsOpen(false);

    try {
      await removeFromTracker(trackerData.id);
      setTrackerData(null);
      toast.success("Removed from tracker");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const currentStatus = trackerData?.status;
  const currentConfig = currentStatus ? STATUS_CONFIG[currentStatus] : null;
  const CurrentIcon = currentConfig?.icon || Target;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <div className="relative inline-block">
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl",
          "font-semibold",
          "shadow-md hover:shadow-lg",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
          sizeClasses[size],
          currentConfig
            ? currentConfig.color
            : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900",
          isLoading && "opacity-70 cursor-wait",
        )}
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <CurrentIcon size={14} />
        )}
        <span>{currentConfig ? currentConfig.label : "Track Application"}</span>
        <ChevronDown
          size={12}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full right-0 mt-2 z-50",
                "w-56",
                "bg-white dark:bg-slate-800",
                "border border-gray-200 dark:border-slate-700",
                "rounded-xl overflow-hidden",
                "shadow-2xl",
              )}
            >
              {/* Header */}
              <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {currentConfig ? "Change Status" : "Track This Opportunity"}
                </p>
              </div>

              {/* Status Options */}
              <div className="py-1">
                {Object.entries(STATUS_CONFIG).map(([status, config]) => {
                  const Icon = config.icon;
                  const isActive = currentStatus === status;

                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5",
                        "text-left transition-colors duration-150",
                        "hover:bg-gray-50 dark:hover:bg-slate-700/50",
                        isActive && "bg-yellow-50 dark:bg-yellow-500/10",
                      )}
                    >
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                          config.lightColor,
                        )}
                      >
                        <Icon size={13} />
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {config.label}
                      </span>
                      {isActive && (
                        <Check
                          size={14}
                          className="text-yellow-500 flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Remove Option */}
              {trackerData && (
                <div className="border-t border-gray-100 dark:border-slate-700 py-1">
                  <button
                    onClick={handleRemove}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5",
                      "text-left transition-colors duration-150",
                      "text-red-600 dark:text-red-400",
                      "hover:bg-red-50 dark:hover:bg-red-500/10",
                    )}
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <XCircle size={13} />
                    </div>
                    <span className="text-sm font-medium">
                      Remove from Tracker
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
