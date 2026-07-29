"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Modal Component
 *
 * SIZES:
 * - sm  → Small modal
 * - md  → Medium (default)
 * - lg  → Large
 * - xl  → Extra large
 * - full → Full screen
 *
 * USAGE:
 *
 * // Basic
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="My Modal">
 *   <p>Modal content</p>
 * </Modal>
 *
 * // With footer
 * <Modal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm"
 *   footer={
 *     <>
 *       <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   Are you sure?
 * </Modal>
 *
 * // Large size
 * <Modal isOpen={open} onClose={close} size="lg" title="Big Modal">
 *   Lots of content
 * </Modal>
 */
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
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw]",
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90vw]",
              sizes[size],
              "bg-white dark:bg-slate-800",
              "rounded-2xl",
              "shadow-2xl",
              "z-[110]",
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
              <div className="flex items-start justify-between gap-4 p-6 pb-4 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  {title && (
                    <h3
                      id="modal-title"
                      className="text-lg font-bold text-gray-900 dark:text-white"
                    >
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
            <div className="px-6 py-2 flex-1 overflow-y-auto">{children}</div>

            {/* Footer */}
            {footer && (
              <div
                className={cn(
                  "flex items-center gap-3 justify-end",
                  "px-6 py-4 flex-shrink-0",
                  "bg-gray-50 dark:bg-slate-900/50",
                  "border-t border-gray-100 dark:border-slate-700",
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
