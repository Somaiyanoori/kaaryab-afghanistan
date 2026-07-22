"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // 'danger' | 'warning' | 'info'
  icon: CustomIcon,
}) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

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

  const variantStyles = {
    danger: {
      icon: "text-red-500 bg-red-100 dark:bg-red-500/20",
      button: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
      icon: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20",
      button: "bg-yellow-500 hover:bg-yellow-600 text-gray-900",
    },
    info: {
      icon: "text-blue-500 bg-blue-100 dark:bg-blue-500/20",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  };

  const styles = variantStyles[variant];
  const Icon = CustomIcon || AlertTriangle;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
              "w-[90vw] max-w-md",
              "bg-white dark:bg-slate-800",
              "rounded-2xl",
              "shadow-2xl",
              "z-[110]",
              "overflow-hidden",
            )}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl",
                    "flex items-center justify-center",
                    styles.icon,
                  )}
                >
                  <Icon size={24} />
                </motion.div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Footer with Actions */}
            <div
              className={cn(
                "flex items-center gap-3 justify-end",
                "px-6 py-4",
                "bg-gray-50 dark:bg-slate-900/50",
                "border-t border-gray-100 dark:border-slate-700",
              )}
            >
              <button
                onClick={onClose}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  "bg-white dark:bg-slate-700",
                  "text-gray-700 dark:text-gray-300",
                  "text-sm font-semibold",
                  "border border-gray-200 dark:border-slate-600",
                  "hover:bg-gray-50 dark:hover:bg-slate-600",
                  "transition-colors",
                )}
              >
                {cancelText}
              </button>
              <motion.button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-lg",
                  "text-sm font-semibold",
                  "transition-colors",
                  styles.button,
                )}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
