"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useUser } from "@clerk/nextjs";

import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../../components/opportunities/OpportunityCardSkeleton.jsx";
import EmptyState from "../../components/states/EmptyState.jsx";
import AnimatedEmptyState from "../../components/states/AnimatedEmptyState.jsx";
import SearchInput from "../../components/opportunities/SearchInput.jsx";
import CategoryTabs from "../../components/opportunities/CategoryTabs.jsx";
import ConfirmModal from "../../components/shared/ConfirmModal.jsx";
import SavedStats from "../../components/saved/SavedStats.jsx";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Button from "../../components/ui/Button.jsx";
import ExportPDFButton from "../../components/saved/ExportPDFButton.jsx";

import { useSavedStore } from "../../store/index.js";
import {
  getSavedOpportunitiesDB,
  removeSavedOpportunityDB,
  clearAllSavedDB,
} from "../../lib/db.js";
import { SORT_OPTIONS } from "../../lib/constants.js";
import { filterOpportunities, cn } from "../../lib/utils.js";
// MAIN PAGE
export default function SavedPage() {
  const { user, isLoaded } = useUser();

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  // DB saved opportunities (from Supabase)
  const [dbSaved, setDbSaved] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  // Local store (fallback for non-signed-in users)
  const localSaved = useSavedStore((state) => state.savedOpportunities);
  const clearLocalSaved = useSavedStore((state) => state.clearAllSaved);

  // FETCH SAVED FROM SUPABASE (if signed in)
  useEffect(() => {
    setMounted(true);

    const loadSaved = async () => {
      if (!isLoaded) return;

      try {
        if (user) {
          // Signed in → load from Supabase
          const data = await getSavedOpportunitiesDB(user.id);
          setDbSaved(data || []);
        }
      } catch (error) {
        console.error("Failed to load saved:", error);
        toast.error("Could not load saved items");
      } finally {
        setIsLoading(false);
      }
    };

    loadSaved();
  }, [user, isLoaded]);

  // DECIDE WHICH SAVED TO SHOW
  // Signed in → use DB
  // Not signed in → use local store
  const savedOpportunities = useMemo(() => {
    if (!mounted) return [];
    if (user) return dbSaved;
    return localSaved;
  }, [user, dbSaved, localSaved, mounted]);

  // FILTER AND SORT
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

  // CLEAR ALL HANDLER
  const handleClearAll = async () => {
    try {
      if (user) {
        // Signed in → clear from Supabase
        await clearAllSavedDB(user.id);
        setDbSaved([]);
      } else {
        // Not signed in → clear local
        clearLocalSaved();
      }
      toast.success("All saved opportunities cleared! 🗑️");
    } catch (error) {
      console.error("Clear failed:", error);
      toast.error("Failed to clear saved items");
    }
  };

  const hasFilters = search || category !== "All";
  const hasSaved = mounted && savedOpportunities.length > 0;

  return (
    <>
      {/* HERO HEADER */}
      <PageHeader
        badge="Your Collection"
        badgeIcon={Bookmark}
        title="Your Saved"
        highlightedText="Opportunities"
        description={
          mounted && savedOpportunities.length > 0
            ? `You have ${savedOpportunities.length} saved ${
                savedOpportunities.length === 1
                  ? "opportunity"
                  : "opportunities"
              }. Review, apply, or organize them here.`
            : "Save opportunities you love and access them all in one place."
        }
        centered
        showGrid
      />

      {/* MAIN CONTENT */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen">
        <div className="container-custom">
          {/* LOADING */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <OpportunityCardSkeleton key={i} />
              ))}
            </div>
          ) : /* EMPTY STATE */
          !hasSaved ? (
            <AnimatedEmptyState
              icon={BookmarkX}
              variant="saved"
              title="No saved opportunities yet"
              description={
                user
                  ? "Start browsing and save opportunities. They'll sync across all your devices and never be lost!"
                  : "Sign in to save opportunities across devices, or start bookmarking below."
              }
              actionLabel="Browse Opportunities"
              actionHref="/opportunities"
              secondaryLabel={user ? null : "Sign In"}
              secondaryHref={user ? null : "/sign-in"}
            />
          ) : (
            /* HAS SAVED ITEMS */
            <>
              {/* Stats */}
              <div className="mb-8">
                <SavedStats savedOpportunities={savedOpportunities} />
              </div>

              {/* Search + Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 flex flex-col md:flex-row gap-3"
              >
                <div className="flex-1">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search within your saved opportunities..."
                  />
                </div>

                {/* Sort */}
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
                {/* Export PDF */}
                <ExportPDFButton opportunities={filteredSaved} />
                {/* Clear All */}
                <Button
                  variant="danger"
                  size="md"
                  icon={Trash2}
                  onClick={() => setShowClearModal(true)}
                >
                  Clear All
                </Button>
              </motion.div>

              {/* Category Tabs */}
              <div className="mb-6">
                <CategoryTabs
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  opportunityCounts={categoryCounts}
                />
              </div>

              {/* Active Filters */}
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
                        className="w-5 h-5 rounded-full hover:bg-yellow-200 flex items-center justify-center ml-1"
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
                        className="w-5 h-5 rounded-full hover:bg-yellow-200 flex items-center justify-center ml-1"
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

              {/* Results Count */}
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

              {/* Cards Grid */}
              {filteredSaved.length === 0 ? (
                <AnimatedEmptyState
                  icon={Search}
                  variant="search"
                  title="No matches found"
                  description="Try adjusting your search or clearing filters to see more results."
                  actionLabel="Clear Filters"
                  onAction={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                />
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
                        transition={{ duration: 0.3, delay: index * 0.05 }}
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

              {/* Bottom CTA */}
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
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
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
                <div className="flex-shrink-0">
                  <Button
                    href="/opportunities"
                    variant="dark"
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Browse All
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* CLEAR ALL MODAL */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearAll}
        title="Clear all saved opportunities?"
        message={`You will remove all ${savedOpportunities.length} saved ${
          savedOpportunities.length === 1 ? "opportunity" : "opportunities"
        } from your collection. This cannot be undone.`}
        confirmText="Yes, Clear All"
        cancelText="Cancel"
        variant="danger"
        icon={Trash2}
      />
    </>
  );
}
