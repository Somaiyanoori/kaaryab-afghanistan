"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  Building2,
  MapPin,
  Tag,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce.js";
import { useSearchSuggestions } from "../../hooks/useSearchSuggestions.js";
import { getCategoryColors, cn } from "../../lib/utils.js";
import CategoryBadge from "./CategoryBadge.jsx";

// ============================================
// RECENT SEARCHES STORAGE
// ============================================
const RECENT_SEARCHES_KEY = "kaaryab_recent_searches";
const MAX_RECENT = 5;

function getRecentSearches() {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query) {
  try {
    const recent = getRecentSearches();
    const filtered = recent.filter((s) => s !== query);
    const updated = [query, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {}
}

// ============================================
// POPULAR SEARCHES (STATIC)
// ============================================
const POPULAR_SEARCHES = [
  "Frontend Developer",
  "Scholarship",
  "Remote Work",
  "Internship",
  "Kabul",
];

// ============================================
// MATCH TYPE ICONS
// ============================================
const MATCH_TYPE_CONFIG = {
  title: { icon: Search, label: "Title" },
  organization: { icon: Building2, label: "Organization" },
  location: { icon: MapPin, label: "Location" },
  tag: { icon: Tag, label: "Tag" },
};

// ============================================
// HIGHLIGHTED TEXT HELPER
// ============================================
function HighlightedText({ text, query }) {
  if (!query || !text) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 dark:bg-yellow-500/30 text-inherit rounded px-0.5 font-bold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AutocompleteSearch({
  opportunities = [],
  value = "",
  onChange,
  placeholder = "Search opportunities, organizations, skills...",
  className,
  autoFocus = false,
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedValue = useDebounce(inputValue, 200);
  const { suggestions, totalCount } = useSearchSuggestions(
    opportunities,
    debouncedValue,
    8,
  );

  // Load recent searches on mount
  useEffect(() => {
    setMounted(true);
    setRecentSearches(getRecentSearches());
  }, []);

  // Sync with parent value
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || "");
    }
  }, [value]);

  // Notify parent of changes (debounced)
  useEffect(() => {
    if (onChange && debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      const items = suggestions.length > 0 ? suggestions : [];
      const maxIndex = items.length - 1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
          break;

        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && items[selectedIndex]) {
            handleSelectSuggestion(items[selectedIndex]);
          } else if (inputValue.trim()) {
            handleSubmitSearch();
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, suggestions, selectedIndex, inputValue],
  );

  // Handle suggestion click
  const handleSelectSuggestion = (suggestion) => {
    if (suggestion.type === "opportunity") {
      saveRecentSearch(suggestion.title);
      router.push(`/opportunities/${suggestion.slug}`);
      setIsOpen(false);
      setInputValue("");
    }
  };

  // Handle search submit
  const handleSubmitSearch = (searchQuery = inputValue) => {
    if (!searchQuery.trim()) return;

    saveRecentSearch(searchQuery.trim());
    setRecentSearches(getRecentSearches());
    router.push(
      `/opportunities?search=${encodeURIComponent(searchQuery.trim())}`,
    );
    setIsOpen(false);
  };

  // Handle recent/popular click
  const handleQuickSearch = (query) => {
    setInputValue(query);
    handleSubmitSearch(query);
  };

  // Clear input
  const handleClear = () => {
    setInputValue("");
    onChange?.("");
    inputRef.current?.focus();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  };

  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const showDropdown = isOpen && mounted;
  const hasQuery = debouncedValue.trim().length >= 2;
  const showSuggestions = hasQuery && suggestions.length > 0;
  const showNoResults = hasQuery && suggestions.length === 0;
  const showQuickSuggestions =
    !hasQuery && (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* SEARCH INPUT */}
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
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
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
        {inputValue && (
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

      {/* AUTOCOMPLETE DROPDOWN */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2",
              "bg-white dark:bg-slate-800",
              "border border-gray-200 dark:border-slate-700",
              "rounded-2xl overflow-hidden",
              "shadow-2xl",
              "z-50",
              "max-h-[500px] overflow-y-auto",
            )}
          >
            {/* SUGGESTIONS */}
            {showSuggestions && (
              <div>
                {/* Header */}
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Suggestions ({suggestions.length})
                    </span>
                    {totalCount > suggestions.length && (
                      <span className="text-xs text-gray-400">
                        +{totalCount - suggestions.length} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Suggestions List */}
                <div className="py-1">
                  {suggestions.map((suggestion, index) => {
                    const matchConfig =
                      MATCH_TYPE_CONFIG[suggestion.matchType] ||
                      MATCH_TYPE_CONFIG.title;
                    const MatchIcon = matchConfig.icon;
                    const colors = getCategoryColors(suggestion.category);
                    const isSelected = selectedIndex === index;

                    return (
                      <motion.button
                        key={suggestion.id}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3",
                          "transition-colors duration-150",
                          "text-left",
                          "border-l-2",
                          isSelected
                            ? "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-500"
                            : "border-transparent hover:bg-gray-50 dark:hover:bg-slate-700/50",
                        )}
                      >
                        {/* Organization Avatar */}
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                          style={{ background: colors.solidGradient }}
                        >
                          {suggestion.subtitle?.charAt(0) || "?"}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title with highlight */}
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            <HighlightedText
                              text={suggestion.title}
                              query={debouncedValue}
                            />
                          </p>

                          {/* Meta info */}
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              <HighlightedText
                                text={suggestion.subtitle}
                                query={debouncedValue}
                              />
                            </span>
                            {suggestion.location && (
                              <>
                                <span className="text-gray-300">·</span>
                                <div className="flex items-center gap-0.5 flex-shrink-0">
                                  <MapPin size={9} className="text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {suggestion.location}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Category badge */}
                        <div className="flex-shrink-0 hidden sm:block">
                          <CategoryBadge
                            category={suggestion.category}
                            size="sm"
                          />
                        </div>

                        {/* Match type indicator */}
                        <div className="flex-shrink-0 flex items-center gap-1 text-gray-400">
                          <MatchIcon size={12} />
                        </div>

                        {/* Arrow */}
                        <ArrowRight
                          size={14}
                          className={cn(
                            "flex-shrink-0 transition-all",
                            isSelected
                              ? "text-yellow-500 translate-x-0.5"
                              : "text-gray-300 dark:text-gray-600",
                          )}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* View All Results */}
                {totalCount > suggestions.length && (
                  <div className="border-t border-gray-100 dark:border-slate-700 p-2">
                    <button
                      onClick={() => handleSubmitSearch()}
                      className={cn(
                        "w-full flex items-center justify-center gap-2",
                        "py-2.5 px-4 rounded-lg",
                        "text-sm font-semibold",
                        "bg-gradient-to-r from-yellow-500 to-orange-500",
                        "hover:from-yellow-400 hover:to-orange-400",
                        "text-gray-900",
                        "transition-all duration-200",
                      )}
                    >
                      <span>
                        See all {totalCount} results for "{debouncedValue}"
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* NO RESULTS */}
            {showNoResults && (
              <div className="p-8 text-center">
                <div className="inline-flex mb-3">
                  <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                    <Search size={24} className="text-gray-400" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  No results for "{debouncedValue}"
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Try different keywords or browse all opportunities
                </p>
                <button
                  onClick={() => handleSubmitSearch()}
                  className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  Search anyway →
                </button>
              </div>
            )}

            {/* QUICK SUGGESTIONS (Recent + Popular) */}
            {showQuickSuggestions && (
              <div>
                {/* RECENT SEARCHES */}
                {recentSearches.length > 0 && (
                  <div className="border-b border-gray-100 dark:border-slate-700">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-slate-900/50">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Recent
                        </span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="py-1">
                      {recentSearches.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickSearch(query)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5",
                            "hover:bg-gray-50 dark:hover:bg-slate-700/50",
                            "transition-colors duration-150",
                            "text-left",
                            "group",
                          )}
                        >
                          <Clock
                            size={14}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                            {query}
                          </span>
                          <ArrowRight
                            size={12}
                            className="text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* POPULAR SEARCHES */}
                <div>
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 dark:bg-slate-900/50">
                    <TrendingUp size={12} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((query) => (
                        <motion.button
                          key={query}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickSearch(query)}
                          className={cn(
                            "inline-flex items-center gap-1.5",
                            "px-3 py-1.5 rounded-full",
                            "bg-gray-100 dark:bg-slate-700",
                            "hover:bg-yellow-100 dark:hover:bg-yellow-500/20",
                            "text-xs font-semibold",
                            "text-gray-700 dark:text-gray-300",
                            "hover:text-yellow-700 dark:hover:text-yellow-400",
                            "border border-transparent",
                            "hover:border-yellow-500",
                            "transition-all duration-200",
                          )}
                        >
                          <Sparkles size={10} />
                          <span>{query}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty state (no recent) */}
                {recentSearches.length === 0 && (
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      💡 Start typing to search opportunities
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* KEYBOARD HINTS */}
            {(showSuggestions || showQuickSuggestions) && (
              <div className="border-t border-gray-100 dark:border-slate-700 px-4 py-2 bg-gray-50 dark:bg-slate-900/50">
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded font-mono">
                        ↑↓
                      </kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded font-mono">
                        ↵
                      </kbd>
                      Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded font-mono">
                      Esc
                    </kbd>
                    Close
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
