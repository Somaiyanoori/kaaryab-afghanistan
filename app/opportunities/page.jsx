"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SearchX } from "lucide-react";

import PageHeader from "../../components/layout/PageHeader.jsx";
import DeadlineAlertBanner from "../../components/opportunities/DeadlineAlertBanner.jsx";
import AutocompleteSearch from "../../components/opportunities/AutocompleteSearch.jsx";
import CategoryTabs from "../../components/opportunities/CategoryTabs.jsx";
import FilterSidebar from "../../components/opportunities/FilterSidebar.jsx";
import ActiveFilters from "../../components/opportunities/ActiveFilters.jsx";
import Toolbar from "../../components/opportunities/Toolbar.jsx";
import Pagination from "../../components/opportunities/Pagination.jsx";
import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../../components/opportunities/OpportunityCardSkeleton.jsx";
import AnimatedEmptyState from "../../components/states/AnimatedEmptyState.jsx";
import RecentlyViewed from "../../components/shared/RecentlyViewed.jsx";
import { getAllOpportunities } from "../../lib/db.js";
import { filterOpportunities, paginateData, cn } from "../../lib/utils.js";

// ============================================
// LOADING FALLBACK
// ============================================
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

// MAIN CONTENT
function OpportunitiesContent() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [dbOpportunities, setDbOpportunities] = useState([]);
  const [dbError, setDbError] = useState(null);

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

  // FETCH FROM SUPABASE
  useEffect(() => {
    setMounted(true);

    const fetchOpportunities = async () => {
      try {
        const data = await getAllOpportunities();
        setDbOpportunities(data || []);
      } catch (error) {
        console.error("Failed to fetch from database:", error);
        setDbError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // UPDATE URL PARAMS
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
  // NORMALIZE DB OPPORTUNITIES
  const normalizedDbOpps = useMemo(() => {
    return dbOpportunities.map((opp) => ({
      id: opp.id,
      slug: opp.slug || opp.id,
      title: opp.title,
      organization: opp.organization,
      category: opp.category,
      location: opp.location,
      type: opp.type,
      deadline: opp.deadline,
      shortDesc: opp.short_desc,
      description: opp.description,
      requirements: opp.requirements || [],
      applyLink: opp.apply_link,
      tags: opp.tags || [],
      contactEmail: opp.contact_email,
      salary: opp.salary,
      duration: opp.duration,
      seats: opp.seats,
      gender: opp.gender,
      language: opp.language,
      featured: opp.featured || false,
      urgent: opp.urgent || false,
      verified: opp.verified || false,
      views: opp.views || 0,
      saves: opp.saves || 0,
      postedDate: opp.posted_date || opp.created_at?.split("T")[0],
    }));
  }, [dbOpportunities]);

  const allOpportunities = useMemo(() => {
    return normalizedDbOpps;
  }, [normalizedDbOpps]);
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
      {/* ============================================
          PAGE HEADER WITH SEARCH BAR INSIDE
      ============================================ */}
      <PageHeader
        badge="Explore All Opportunities"
        badgeIcon={Sparkles}
        title="Find Your Next"
        highlightedText="Opportunity"
        description={`Browse through ${allOpportunities.length}+ opportunities across Afghanistan.`}
        centered
      >
        <div className="max-w-2xl mx-auto w-full">
          <AutocompleteSearch
            opportunities={allOpportunities}
            value={filters.search}
            onChange={(value) => updateFilter("search", value)}
            placeholder="Search opportunities, organizations, skills..."
          />
        </div>
      </PageHeader>

      {/* ============================================
          CONTENT SECTION
      ============================================ */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen relative">
        <div className="container-custom">
          {/* DEADLINE ALERT BANNER */}
          <DeadlineAlertBanner
            opportunities={dbOpportunities}
            onFilterExpiring={() => updateFilter("deadline", "week")}
          />

          {/* CATEGORY TABS */}
          <div className="mb-6">
            <CategoryTabs
              selectedCategory={filters.category}
              onCategoryChange={(cat) => updateFilter("category", cat)}
              opportunityCounts={categoryCounts}
            />
          </div>

          {/* MAIN LAYOUT: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Filters */}
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

                {/* Recently Viewed */}
                <RecentlyViewed maxShow={4} />
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
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

              {/* Active Filters */}
              <div className="mb-6">
                <ActiveFilters
                  filters={filters}
                  onRemove={(key, value) => updateFilter(key, value)}
                  onClearAll={clearAllFilters}
                />
              </div>

              {/* Cards Grid */}
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
                <AnimatedEmptyState
                  icon={SearchX}
                  variant="search"
                  title="No opportunities found"
                  description="We couldn't find any opportunities matching your criteria. Try different filters or clear them all."
                  actionLabel="Clear All Filters"
                  onAction={clearAllFilters}
                  secondaryLabel="Browse All"
                  secondaryHref="/opportunities"
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

      {/* ============================================
          MOBILE FILTER DRAWER
      ============================================ */}
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

// ============================================
// EXPORT WITH SUSPENSE
// ============================================
export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OpportunitiesContent />
    </Suspense>
  );
}
