"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Send,
  MessageCircle,
  Trophy,
  XCircle,
  TrendingUp,
  BookmarkX,
  ArrowRight,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

import PageHeader from "../../components/layout/PageHeader.jsx";
import KanbanColumn from "../../components/tracker/KanbanColumn.jsx";
import AnimatedEmptyState from "../../components/states/AnimatedEmptyState.jsx";
import Button from "../../components/ui/Button.jsx";
import { getTrackerItems } from "../../lib/db.js";
import { useTrackerStore } from "../../store/index.js";

// ============================================
// STATUS COLUMNS CONFIG
// ============================================
const STATUS_COLUMNS = {
  interested: {
    label: "Interested",
    description: "Saved for later",
    icon: Heart,
    headerBg: "bg-blue-50 dark:bg-blue-500/10",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    countBg: "bg-blue-500 text-white",
  },
  applied: {
    label: "Applied",
    description: "Application sent",
    icon: Send,
    headerBg: "bg-purple-50 dark:bg-purple-500/10",
    iconBg: "bg-purple-500",
    iconColor: "text-white",
    countBg: "bg-purple-500 text-white",
  },
  interview: {
    label: "Interview",
    description: "In progress",
    icon: MessageCircle,
    headerBg: "bg-yellow-50 dark:bg-yellow-500/10",
    iconBg: "bg-yellow-500",
    iconColor: "text-white",
    countBg: "bg-yellow-500 text-gray-900",
  },
  accepted: {
    label: "Accepted",
    description: "You got it!",
    icon: Trophy,
    headerBg: "bg-green-50 dark:bg-green-500/10",
    iconBg: "bg-green-500",
    iconColor: "text-white",
    countBg: "bg-green-500 text-white",
  },
  rejected: {
    label: "Rejected",
    description: "Not selected",
    icon: XCircle,
    headerBg: "bg-red-50 dark:bg-red-500/10",
    iconBg: "bg-red-500",
    iconColor: "text-white",
    countBg: "bg-red-500 text-white",
  },
};

// ============================================
// STATS CARD COMPONENT
// ============================================
function StatCard({ label, value, icon: Icon, gradient, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
          style={{ background: gradient }}
        >
          <Icon size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">
            {value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TrackerPage() {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const items = useTrackerStore((state) => state.items);
  const setItems = useTrackerStore((state) => state.setItems);
  const getStats = useTrackerStore((state) => state.getStats);

  // Fetch tracker items from Supabase
  useEffect(() => {
    setMounted(true);

    const fetchItems = async () => {
      if (!isLoaded) return;

      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getTrackerItems(user.id);
        setItems(data || []);
      } catch (error) {
        console.error("Failed to fetch tracker:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [user, isLoaded, setItems]);

  // Group items by status
  const itemsByStatus = useMemo(() => {
    const grouped = {
      interested: [],
      applied: [],
      interview: [],
      accepted: [],
      rejected: [],
    };

    items.forEach((item) => {
      if (grouped[item.status]) {
        grouped[item.status].push(item);
      }
    });

    return grouped;
  }, [items]);

  const stats = getStats();

  // LOADING STATE
  if (isLoading) {
    return (
      <>
        <PageHeader
          badge="Application Tracker"
          badgeIcon={Target}
          title="Track Your"
          highlightedText="Applications"
          description="Loading your applications..."
          centered
        />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  // NOT SIGNED IN STATE
  if (mounted && !user) {
    return (
      <>
        <PageHeader
          badge="Application Tracker"
          badgeIcon={Target}
          title="Track Your"
          highlightedText="Applications"
          description="Manage your job applications from interest to acceptance."
          centered
        />
        <section className="bg-gray-50 dark:bg-slate-950 py-16 min-h-screen">
          <div className="container-custom max-w-md mx-auto">
            <AnimatedEmptyState
              icon={Target}
              variant="default"
              title="Sign in to track applications"
              description="Create a free account to save opportunities and track your application progress across all your devices."
              actionLabel="Sign In"
              actionHref="/sign-in"
              secondaryLabel="Create Account"
              secondaryHref="/sign-up"
            />
          </div>
        </section>
      </>
    );
  }

  const hasItems = items.length > 0;

  return (
    <>
      {/* HERO HEADER */}
      <PageHeader
        badge="Application Tracker"
        badgeIcon={Target}
        title="Track Your"
        highlightedText="Applications"
        description={
          hasItems
            ? `You have ${items.length} application${items.length === 1 ? "" : "s"} in your tracker.`
            : "Start tracking opportunities to organize your job search."
        }
        centered
      />

      {/* CONTENT SECTION */}
      <section className="bg-gray-50 dark:bg-slate-950 py-8 md:py-12 min-h-screen">
        <div className="container-custom">
          {/* EMPTY STATE */}
          {!hasItems ? (
            <AnimatedEmptyState
              icon={BookmarkX}
              variant="default"
              title="No applications tracked yet"
              description="Browse opportunities and click 'Track Application' to add them here. Organize your entire job search in one place!"
              actionLabel="Browse Opportunities"
              actionHref="/opportunities"
            />
          ) : (
            <>
              {/* STATS CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
                <StatCard
                  label="Total"
                  value={stats.total}
                  icon={Target}
                  gradient="linear-gradient(135deg, #6B7280 0%, #374151 100%)"
                  index={0}
                />
                <StatCard
                  label="Interested"
                  value={stats.interested}
                  icon={Heart}
                  gradient="linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)"
                  index={1}
                />
                <StatCard
                  label="Applied"
                  value={stats.applied}
                  icon={Send}
                  gradient="linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)"
                  index={2}
                />
                <StatCard
                  label="Interviews"
                  value={stats.interview}
                  icon={MessageCircle}
                  gradient="linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)"
                  index={3}
                />
                <StatCard
                  label="Accepted"
                  value={stats.accepted}
                  icon={Trophy}
                  gradient="linear-gradient(135deg, #22C55E 0%, #15803D 100%)"
                  index={4}
                />
              </div>

              {/* SUCCESS RATE BANNER */}
              {stats.applied > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 p-5 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-blue-500/10 border border-yellow-500/20 rounded-2xl"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Your Success Rate
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {stats.accepted} accepted out of {stats.applied} applied
                        (
                        {stats.applied > 0
                          ? Math.round((stats.accepted / stats.applied) * 100)
                          : 0}
                        %)
                      </p>
                    </div>
                    <Button
                      href="/opportunities"
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Find More
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* KANBAN BOARD */}
              <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="grid grid-cols-5 gap-4 min-w-[1200px]">
                  {Object.entries(STATUS_COLUMNS).map(
                    ([status, config], index) => (
                      <KanbanColumn
                        key={status}
                        status={status}
                        config={config}
                        items={itemsByStatus[status] || []}
                        index={index}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* MOBILE TIP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                  💡 Tip: Swipe left/right to see all columns
                </p>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
