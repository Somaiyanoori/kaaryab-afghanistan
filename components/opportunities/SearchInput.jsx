"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce.js";
import { cn } from "../../lib/utils.js";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) {
  const [localValue, setLocalValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedValue = useDebounce(localValue, 300);

  // Sync with parent when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  // Sync when parent value changes externally (e.g., from URL)
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value || "");
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        className={cn(
          "relative flex items-center",
          "bg-white dark:bg-slate-800",
          "rounded-xl",
          "border-2 transition-all duration-200",
          "shadow-sm",
          isFocused
            ? "border-yellow-500 shadow-yellow-glow"
            : "border-gray-200 dark:border-slate-700",
        )}
      >
        {/* Search Icon */}
        <div className="pl-4 pr-2 flex items-center pointer-events-none">
          <Search
            size={18}
            className={cn(
              "transition-colors duration-200",
              isFocused ? "text-yellow-500" : "text-gray-400",
            )}
          />
        </div>

        {/* Input */}
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "flex-1 py-3 pr-4",
            "bg-transparent",
            "text-gray-900 dark:text-white",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "text-sm md:text-base",
            "focus:outline-none",
          )}
        />

        {/* Clear Button */}
        {localValue && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleClear}
            className={cn(
              "mr-2 w-8 h-8 rounded-full",
              "flex items-center justify-center",
              "bg-gray-100 hover:bg-gray-200",
              "dark:bg-slate-700 dark:hover:bg-slate-600",
              "text-gray-500 dark:text-gray-400",
              "transition-colors duration-200",
            )}
            aria-label="Clear search"
          >
            <X size={14} />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
