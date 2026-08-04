"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}) {
  // Close on ESC key
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, closeOnEsc]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Size styles
  const sizes = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl",
    full: "sm:max-w-[95vw]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Wrapper (full screen container) */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "relative w-full pointer-events-auto",
                sizes[size],
                "bg-white dark:bg-slate-800",
                "rounded-2xl shadow-2xl",
                "overflow-hidden",
                "max-h-[90vh] flex flex-col",
                className,
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "modal-title" : undefined}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between gap-4 p-4 sm:p-6 pb-2 sm:pb-4 flex-shrink-0">
                  <div className="flex-1 min-w-0">
                    {title && (
                      <h3
                        id="modal-title"
                        className="text-base sm:text-lg font-bold text-gray-900 dark:text-white break-words"
                      >
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                        {description}
                      </p>
                    )}
                  </div>

                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Content (scrollable) */}
              <div className="px-4 sm:px-6 py-2 flex-1 overflow-y-auto">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div
                  className={cn(
                    "flex items-center gap-2 sm:gap-3 justify-end flex-wrap",
                    "px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0",
                    "bg-gray-50 dark:bg-slate-900/50",
                    "border-t border-gray-100 dark:border-slate-700",
                  )}
                >
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
