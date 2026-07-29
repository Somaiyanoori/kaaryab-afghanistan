"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils.js";

/**
 * Reusable Select Component
 *
 * USAGE:
 *
 * // With object options
 * <Select
 *   label="Category"
 *   name="category"
 *   register={register}
 *   error={errors.category}
 *   required
 *   icon={Tag}
 *   options={[
 *     { value: "job", label: "Job" },
 *     { value: "internship", label: "Internship" },
 *   ]}
 * />
 *
 * // With simple string array
 * <Select
 *   label="Level"
 *   value={level}
 *   onChange={(e) => setLevel(e.target.value)}
 *   options={["Beginner", "Intermediate", "Advanced"]}
 * />
 *
 * // With custom placeholder
 * <Select
 *   label="Location"
 *   placeholder="Choose a city"
 *   options={cities}
 * />
 */
export default function Select({
  label,
  name,
  value,
  onChange,
  onBlur,
  register,
  error,
  options = [],
  required = false,
  disabled = false,
  helper,
  icon: Icon,
  placeholder = "Select an option",
  size = "md",
  className,
  ...rest
}) {
  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 pr-8 text-xs",
    md: "px-4 py-2.5 pr-10 text-sm",
    lg: "px-4 py-3 pr-10 text-base",
  };

  // Get input props
  const inputProps = register ? register(name) : { value, onChange, onBlur };

  // Normalize options (handle both string arrays and object arrays)
  const normalizedOptions = options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return { value: option, label: option };
    }
    return option;
  });

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

      {/* Select Wrapper */}
      <div className="relative">
        <select
          id={name}
          disabled={disabled}
          {...inputProps}
          {...rest}
          className={cn(
            "w-full appearance-none rounded-lg",
            "bg-white dark:bg-slate-800",
            "border-2 transition-all duration-200",
            "text-gray-900 dark:text-white",
            "focus:outline-none",
            "cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizes[size],
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-200 dark:border-slate-700 focus:border-yellow-500",
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
            <p className="text-xs text-red-500 font-medium">
              {typeof error === "string" ? error : error.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
