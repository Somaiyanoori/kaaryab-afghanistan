"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Textarea Component
 *
 * USAGE:
 *
 * // Basic
 * <Textarea
 *   label="Description"
 *   value={desc}
 *   onChange={(e) => setDesc(e.target.value)}
 *   rows={4}
 * />
 *
 * // With character counter
 * <Textarea
 *   label="Bio"
 *   maxLength={500}
 *   value={bio}
 *   onChange={handleChange}
 * />
 *
 * // With react-hook-form
 * <Textarea
 *   label="Message"
 *   name="message"
 *   register={register}
 *   error={errors.message}
 *   maxLength={1000}
 *   value={messageValue}
 * />
 */
export default function Textarea({
  label,
  name,
  value = "",
  onChange,
  onBlur,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  helper,
  icon: Icon,
  rows = 4,
  maxLength,
  className,
  ...rest
}) {
  const charCount = value?.length || 0;
  const isNearLimit = maxLength && charCount > maxLength * 0.8;

  // Get input props (either from register or manual)
  const inputProps = register ? register(name) : { value, onChange, onBlur };

  return (
    <div className={cn("w-full", className)}>
      {/* Label + Character Counter */}
      {(label || maxLength) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label
              htmlFor={name}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {Icon && <Icon size={14} className="text-yellow-500" />}
              <span>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
          )}

          {maxLength && (
            <span
              className={cn(
                "text-xs font-medium",
                isNearLimit
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-gray-400",
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Textarea */}
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        {...inputProps}
        {...rest}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "bg-white dark:bg-slate-800",
          "border-2 transition-all duration-200",
          "text-sm text-gray-900 dark:text-white",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:outline-none",
          "resize-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
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
