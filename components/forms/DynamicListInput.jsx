"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function DynamicListInput({
  label,
  items,
  onChange,
  placeholder = "Add item...",
  error,
  required = false,
  helper,
  icon: Icon,
  maxItems = 20,
}) {
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed) && items.length < maxItems) {
      onChange([...items, trimmed]);
      setInput("");
    }
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {Icon && <Icon size={14} className="text-yellow-500" />}
          <span>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
        <span className="text-xs text-gray-400">
          {items.length}/{maxItems}
        </span>
      </div>

      {/* Input + Add button */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={items.length >= maxItems}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg",
            "bg-white dark:bg-slate-800",
            "border-2 transition-all duration-200",
            "text-sm text-gray-900 dark:text-white",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none",
            error
              ? "border-red-500"
              : "border-gray-200 dark:border-slate-700 focus:border-yellow-500",
          )}
        />
        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={!input.trim() || items.length >= maxItems}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-4 py-2.5 rounded-lg",
            "bg-yellow-500 hover:bg-yellow-400",
            "text-gray-900 font-semibold text-sm",
            "flex items-center gap-1",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <Plus size={16} />
          <span>Add</span>
        </motion.button>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={`${item}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className={cn(
                  "inline-flex items-center gap-1.5 pl-3 pr-1 py-1.5",
                  "bg-yellow-100 dark:bg-yellow-500/20",
                  "text-yellow-800 dark:text-yellow-300",
                  "text-sm font-medium",
                  "rounded-full",
                  "border border-yellow-300 dark:border-yellow-500/30",
                )}
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="w-5 h-5 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-500/30 flex items-center justify-center transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {helper && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>
      )}

      {error && (
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={12} className="text-red-500" />
          <p className="text-xs text-red-500 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
