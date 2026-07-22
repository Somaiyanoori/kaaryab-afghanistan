"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SearchX } from "lucide-react";

import SearchInput from "../../components/opportunities/SearchInput.jsx";
import CategoryTabs from "../../components/opportunities/CategoryTabs.jsx";
import FilterSidebar from "../../components/opportunities/FilterSidebar.jsx";
import ActiveFilters from "../../components/opportunities/ActiveFilters.jsx";
import Toolbar from "../../components/opportunities/Toolbar.jsx";
import Pagination from "../../components/opportunities/Pagination.jsx";
import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../../components/opportunities/OpportunityCardSkeleton.jsx";
import EmptyState from "../../components/states/EmptyState.jsx";

import { opportunities } from "../../data/opportunities.js";
import { useOpportunitiesStore } from "../../store/index.js";
import { filterOpportunities, paginateData, cn } from "../../lib/utils.js";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Loading opportunities...
        </p>
      </div>
    </div>
  );
}

function OpportunitiesContent() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "All",
    location: searchParams.get("location") || "All",
    type: searchParams.get("type") || "All",
    deadline: searchParams.get("deadline") || "all",
    sort: searchParams.get("sort") || "newest",
    page: parseInt(searchParams.get("page")) || 1,
  });

  const perPage = 12;
  const userOpportunities = useOpportunitiesStore(
    (state) => state.userOpportunities,
  );

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category !== "All") params.set("category", filters.category);
    if (filters.location !== "All") params.set("location", filters.location);
    if (filters.type !== "All") params.set("type", filters.type);
    if (filters.deadline !== "all") params.set("deadline", filters.deadline);
    if (filters.sort !== "newest") params.set("sort", filters.sort);
    if (filters.page !== 1) params.set("page", filters.page);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";
    window.history.replaceState({}, "", `/opportunities${newUrl}`);
  }, [filters, mounted]);

  const allOpportunities = useMemo(() => {
    if (!mounted) return opportunities;
    return [...opportunities, ...userOpportunities];
  }, [mounted, userOpportunities]);

  const filteredOpportunities = useMemo(() => {
    return filterOpportunities(allOpportunities, filters);
  }, [allOpportunities, filters]);

  const paginated = useMemo(() => {
    return paginateData(filteredOpportunities, filters.page, perPage);
  }, [filteredOpportunities, filters.page]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    allOpportunities.forEach((opp) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, [allOpportunities]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.location !== "All") count++;
    if (filters.type !== "All") count++;
    if (filters.deadline !== "all") count++;
    return count;
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      category: "All",
      location: "All",
      type: "All",
      deadline: "all",
      sort: "newest",
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
          >
            <Sparkles size={14} className="text-yellow-400" />
            <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
              Explore All Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
          >
            Find Your Next <span className="gradient-text">Opportunity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Browse through{" "}
            {mounted ? allOpportunities.length : opportunities.length}+
            opportunities across Afghanistan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <SearchInput
              value={filters.search}
              onChange={(value) => updateFilter("search", value)}
              placeholder="Search opportunities, organizations, skills..."
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen">
        <div className="container-custom">
          <div className="mb-6">
            <CategoryTabs
              selectedCategory={filters.category}
              onCategoryChange={(cat) => updateFilter("category", cat)}
              opportunityCounts={categoryCounts}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    Filters
                  </h3>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearAll={clearAllFilters}
                  />
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <Toolbar
                  totalResults={filteredOpportunities.length}
                  sort={filters.sort}
                  onSortChange={(sort) => updateFilter("sort", sort)}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onOpenFilters={() => setIsMobileFiltersOpen(true)}
                  activeFilterCount={activeFilterCount}
                />
              </div>

              <div className="mb-6">
                <ActiveFilters
                  filters={filters}
                  onRemove={(key, value) => updateFilter(key, value)}
                  onClearAll={clearAllFilters}
                />
              </div>

              {isLoading ? (
                <div
                  className={cn(
                    "grid gap-5",
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1",
                  )}
                >
                  {[...Array(6)].map((_, i) => (
                    <OpportunityCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredOpportunities.length === 0 ? (
                <EmptyState
                  icon={SearchX}
                  title="No opportunities found"
                  description="Try adjusting your search or removing some filters."
                  actionLabel="Clear All Filters"
                  onAction={clearAllFilters}
                />
              ) : (
                <>
                  <div
                    className={cn(
                      "grid gap-5",
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1",
                    )}
                  >
                    {paginated.data.map((opportunity, index) => (
                      <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        index={index}
                      />
                    ))}
                  </div>

                  {paginated.totalPages > 1 && (
                    <div className="mt-10">
                      <Pagination
                        currentPage={paginated.currentPage}
                        totalPages={paginated.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-white dark:bg-slate-800 shadow-2xl overflow-hidden flex flex-col"
            >
              <FilterSidebar
                filters={filters}
                onFilterChange={updateFilter}
                onClearAll={clearAllFilters}
                onClose={() => setIsMobileFiltersOpen(false)}
                isMobile={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OpportunitiesContent />
    </Suspense>
  );
}
