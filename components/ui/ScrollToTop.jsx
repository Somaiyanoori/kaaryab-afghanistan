"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * ScrollToTop Component
 *
 * Shows a button when user scrolls down.
 * Clicking it smoothly scrolls to top of page.
 *
 * USAGE:
 * Just add once in layout:
 * <ScrollToTop />
 *
 * // Show earlier (default 400px)
 * <ScrollToTop showAfter={200} />
 *
 * // Different position
 * <ScrollToTop position="bottom-left" />
 *
 * // Different color
 * <ScrollToTop color="blue" />
 */
export default function ScrollToTop({
  showAfter = 400,
  position = "bottom-right",
  color = "yellow",
  className,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const positions = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  };

  const colors = {
    yellow: cn(
      "bg-gradient-to-br from-yellow-500 to-orange-500",
      "hover:from-yellow-400 hover:to-orange-400",
      "text-gray-900",
      "shadow-yellow-glow",
    ),
    blue: cn(
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "hover:from-blue-400 hover:to-blue-500",
      "text-white",
      "shadow-blue-glow",
    ),
    dark: cn(
      "bg-gray-900 hover:bg-gray-800",
      "dark:bg-white dark:hover:bg-gray-100",
      "text-white dark:text-gray-900",
      "shadow-lg",
    ),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "fixed z-50",
            "w-12 h-12 rounded-full",
            "flex items-center justify-center",
            "shadow-lg hover:shadow-xl",
            "transition-shadow duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
            positions[position],
            colors[color],
            className,
          )}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
