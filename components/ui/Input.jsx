"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Input Component
 *
 * USAGE:
 *
 * // Basic
 * <Input
 *   label="Full Name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 *
 * // With react-hook-form
 * <Input
 *   label="Email"
 *   name="email"
 *   type="email"
 *   register={register}
 *   error={errors.email}
 *   required
 *   icon={Mail}
 * />
 *
 * // With icon and helper
 * <Input
 *   label="Website"
 *   type="url"
 *   icon={Globe}
 *   helper="Enter a valid URL"
 * />
 */
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  helper,
  icon: Icon,
  size = "md",
  className,
  ...rest
}) {
  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-4 py-3 text-base",
  };

  // Get input props (either from register or manual)
  const inputProps = register ? register(name) : { value, onChange, onBlur };

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      {label && (
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
      )}

      {/* Input */}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
        {...rest}
        className={cn(
          "w-full rounded-lg",
          "bg-white dark:bg-slate-800",
          "border-2 transition-all duration-200",
          "text-gray-900 dark:text-white",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizes[size],
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-200 dark:border-slate-700 focus:border-yellow-500",
        )}
      />

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
            <p className="text-xs text-red-500 font-medium">
              {typeof error === "string" ? error : error.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
