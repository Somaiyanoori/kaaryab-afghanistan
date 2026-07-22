"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required = false,
  helper,
  icon: Icon,
  ...rest
}) {
  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
      >
        {Icon && <Icon size={14} className="text-yellow-500" />}
        <span>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg",
            "bg-white dark:bg-slate-800",
            "border-2 transition-all duration-200",
            "text-sm text-gray-900 dark:text-white",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 dark:border-slate-700 focus:border-yellow-500",
          )}
        />
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {helper}
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-1.5 mt-1.5"
          >
            <AlertCircle size={12} className="text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-500 font-medium">{error.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
