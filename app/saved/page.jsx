"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  BookmarkX,
  Trash2,
  Search,
  ArrowRight,
  Sparkles,
  Filter,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../../components/opportunities/OpportunityCardSkeleton.jsx";
import EmptyState from "../../components/states/EmptyState.jsx";
import SearchInput from "../../components/opportunities/SearchInput.jsx";
import CategoryTabs from "../../components/opportunities/CategoryTabs.jsx";
import ConfirmModal from "../../components/shared/ConfirmModal.jsx";
import SavedStats from "../../components/saved/SavedStats.jsx";

import { useSavedStore } from "../../store/index.js";
import { SORT_OPTIONS } from "../../lib/constants.js";
import { filterOpportunities, cn } from "../../lib/utils.js";

export default function SavedPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  // Get saved data from store
  const savedOpportunities = useSavedStore((state) => state.savedOpportunities);
  const clearAllSaved = useSavedStore((state) => state.clearAllSaved);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort saved opportunities
  const filteredSaved = useMemo(() => {
    if (!mounted) return [];
    return filterOpportunities(savedOpportunities, {
      search,
      category,
      sort,
    });
  }, [savedOpportunities, search, category, sort, mounted]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    savedOpportunities.forEach((opp) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, [savedOpportunities]);

  const handleClearAll = () => {
    clearAllSaved();
    toast.success("All saved opportunities cleared! 🗑️");
  };

  const hasFilters = search || category !== "All";
  const hasSaved = mounted && savedOpportunities.length > 0;

  return (
    <>
      {/* ============================================
          HERO HEADER
      ============================================ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container-custom text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
          >
            <Bookmark size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
              Your Collection
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Your Saved <span className="gradient-text">Opportunities</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {mounted && savedOpportunities.length > 0
              ? `You have ${savedOpportunities.length} saved ${savedOpportunities.length === 1 ? "opportunity" : "opportunities"}. Review, apply, or organize them here.`
              : "Save opportunities you love and access them all in one place."}
          </motion.p>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen">
        <div className="container-custom">
          {/* ============================================
              LOADING STATE
          ============================================ */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <OpportunityCardSkeleton key={i} />
              ))}
            </div>
          ) : /* ============================================
              EMPTY STATE (No saved items)
          ============================================ */
          !hasSaved ? (
            <div className="max-w-md mx-auto">
              <EmptyState
                icon={BookmarkX}
                title="No saved opportunities yet"
                description="Start browsing opportunities and click the bookmark icon to save the ones you're interested in. They'll appear here for easy access later."
                actionLabel="Browse Opportunities"
                actionHref="/opportunities"
              />
            </div>
          ) : (
            <>
              {/* ============================================
                  STATISTICS CARDS
              ============================================ */}
              <div className="mb-8">
                <SavedStats savedOpportunities={savedOpportunities} />
              </div>

              {/* ============================================
                  SEARCH + ACTIONS BAR
              ============================================ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 flex flex-col md:flex-row gap-3"
              >
                {/* Search */}
                <div className="flex-1">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search within your saved opportunities..."
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={cn(
                      "appearance-none px-4 py-3 pr-10 rounded-xl",
                      "bg-white dark:bg-slate-800",
                      "border-2 border-gray-200 dark:border-slate-700",
                      "text-sm font-semibold text-gray-700 dark:text-gray-300",
                      "focus:outline-none focus:border-yellow-500",
                      "cursor-pointer",
                      "hover:border-yellow-500 transition-colors duration-200",
                      "w-full md:w-auto",
                    )}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Filter
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                {/* Clear All Button */}
                <motion.button
                  onClick={() => setShowClearModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center justify-center gap-2",
                    "px-4 py-3 rounded-xl",
                    "bg-red-50 hover:bg-red-100",
                    "dark:bg-red-500/10 dark:hover:bg-red-500/20",
                    "text-red-600 dark:text-red-400",
                    "font-semibold text-sm",
                    "border-2 border-red-200 dark:border-red-500/30",
                    "transition-colors duration-200",
                    "whitespace-nowrap",
                  )}
                >
                  <Trash2 size={16} />
                  <span>Clear All</span>
                </motion.button>
              </motion.div>

              {/* ============================================
                  CATEGORY TABS
              ============================================ */}
              <div className="mb-6">
                <CategoryTabs
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  opportunityCounts={categoryCounts}
                />
              </div>

              {/* ============================================
                  ACTIVE FILTERS
              ============================================ */}
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center flex-wrap gap-2"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Filtering:
                  </span>

                  {search && (
                    <div className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full border border-yellow-300">
                      <span>"{search}"</span>
                      <button
                        onClick={() => setSearch("")}
                        className="w-5 h-5 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-500/30 flex items-center justify-center ml-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  {category !== "All" && (
                    <div className="inline-flex items-center gap-1.5 pl-3 pr-1 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full border border-yellow-300">
                      <span>{category}</span>
                      <button
                        onClick={() => setCategory("All")}
                        className="w-5 h-5 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-500/30 flex items-center justify-center ml-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
                  >
                    Clear all
                  </button>
                </motion.div>
              )}

              {/* ============================================
                  RESULTS COUNT
              ============================================ */}
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {filteredSaved.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {savedOpportunities.length}
                </span>{" "}
                saved
              </div>

              {/* ============================================
                  RESULTS GRID or Empty Filter State
              ============================================ */}
              {filteredSaved.length === 0 ? (
                <div className="max-w-md mx-auto">
                  <EmptyState
                    icon={Search}
                    title="No matches found"
                    description="Try adjusting your search or clearing filters to see all your saved opportunities."
                    actionLabel="Clear Filters"
                    onAction={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                  />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {filteredSaved.map((opportunity, index) => (
                      <motion.div
                        key={opportunity.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                      >
                        <OpportunityCard
                          opportunity={opportunity}
                          index={index}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* ============================================
                  CTA: Discover More
              ============================================ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "mt-12 p-6 md:p-8",
                  "bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-blue-500/10",
                  "border border-yellow-500/20",
                  "rounded-2xl",
                  "flex flex-col md:flex-row items-center gap-6",
                )}
              >
                <div className="flex-shrink-0">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl",
                      "bg-gradient-to-br from-yellow-500 to-orange-500",
                      "flex items-center justify-center",
                      "shadow-lg",
                    )}
                  >
                    <Sparkles size={28} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Discover More Opportunities
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore hundreds of opportunities across Afghanistan and
                    save your favorites.
                  </p>
                </div>

                <Link href="/opportunities" className="flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "flex items-center gap-2",
                      "px-6 py-3 rounded-xl",
                      "bg-gray-900 dark:bg-white",
                      "text-white dark:text-gray-900",
                      "font-semibold text-sm",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-200",
                      "whitespace-nowrap",
                    )}
                  >
                    <span>Browse All</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ============================================
          CLEAR ALL CONFIRMATION MODAL
      ============================================ */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearAll}
        title="Clear all saved opportunities?"
        message={`You will remove all ${savedOpportunities.length} saved ${savedOpportunities.length === 1 ? "opportunity" : "opportunities"} from your collection. This action cannot be undone.`}
        confirmText="Yes, Clear All"
        cancelText="Cancel"
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}
