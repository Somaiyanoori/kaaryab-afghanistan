"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed.js";
import OpportunityCard from "../opportunities/OpportunityCard.jsx";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

export default function RecentlyViewedHomeSection() {
  const { recentlyViewed, hasRecentlyViewed, clearRecentlyViewed } =
    useRecentlyViewed();

  // Only show if user has viewed at least 2 opportunities
  if (!hasRecentlyViewed || recentlyViewed.length < 2) return null;

  const displayItems = recentlyViewed.slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-slate-950">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Clock size={18} className="text-white" />
            </div>

            <div>
              <h2
                className="text-xl md:text-2xl font-black text-gray-900 dark:text-white"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Recently <span className="gradient-text">Viewed</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Continue where you left off
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearRecentlyViewed}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
            >
              Clear history
            </button>

            <Button
              href="/opportunities"
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              Browse All
            </Button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayItems.map((opportunity, index) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              index={index}
            />
          ))}
        </div>

        {/* Footer Note */}
        {recentlyViewed.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You've viewed{" "}
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                {recentlyViewed.length}
              </span>{" "}
              opportunities recently.{" "}
              <Link
                href="/opportunities"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                See all →
              </Link>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
