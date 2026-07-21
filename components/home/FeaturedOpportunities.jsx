"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import SectionHeader from "../shared/SectionHeader.jsx";
import OpportunityCard from "../opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../opportunities/OpportunityCardSkeleton.jsx";
import { opportunities } from "../../data/opportunities.js";
import { cn } from "../../lib/utils.js";
import { isPast, parseISO } from "date-fns";

export default function FeaturedOpportunities() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate loading for skeleton demo
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter featured opportunities that haven't expired
  const featuredOpportunities = opportunities
    .filter((opp) => {
      try {
        return opp.featured && !isPast(parseISO(opp.deadline));
      } catch {
        return opp.featured;
      }
    })
    .slice(0, 6);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-900">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* ============================================
          Content Container
      ============================================ */}
      <div className="relative container-custom">
        {/* Section Header with View All */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="flex-1">
            <SectionHeader
              badge="Featured"
              badgeIcon={Star}
              title="Hand-Picked"
              highlightedText="Opportunities for You"
              description="Discover the best opportunities we've curated for Afghan youth. Updated regularly."
              align="left"
              className="mb-0"
            />
          </div>

          {/* View All Link (Desktop) */}
          <Link href="/opportunities" className="hidden md:block flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex items-center gap-2",
                "px-5 py-2.5 rounded-xl",
                "bg-gray-100 hover:bg-yellow-500",
                "dark:bg-slate-800 dark:hover:bg-yellow-500",
                "text-gray-900 dark:text-white",
                "hover:text-gray-900 dark:hover:text-gray-900",
                "font-semibold text-sm",
                "transition-all duration-200",
                "group",
              )}
            >
              <span>View All</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </div>

        {/* ============================================
            Opportunities Grid
        ============================================ */}
        {!mounted ? (
          // Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <OpportunityCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredOpportunities.length > 0 ? (
          // Real Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {featuredOpportunities.map((opportunity, index) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                index={index}
              />
            ))}
          </div>
        ) : (
          // Empty State (in case no featured opportunities)
          <div className="text-center py-16">
            <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No featured opportunities right now. Check back soon!
            </p>
          </div>
        )}

        {/* ============================================
            Bottom View All Button (Mobile)
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:hidden text-center"
        >
          <Link href="/opportunities">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "inline-flex items-center gap-2",
                "w-full sm:w-auto",
                "px-6 py-3 rounded-xl",
                "bg-yellow-500 hover:bg-yellow-400",
                "text-gray-900",
                "font-semibold text-sm",
                "shadow-md hover:shadow-yellow-glow",
                "transition-all duration-200",
              )}
            >
              <span>Browse All Opportunities</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* ============================================
            Info Banner (bottom)
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "mt-12 md:mt-16",
            "p-6 md:p-8",
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
              Have an opportunity to share?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Help other Afghan youth by submitting jobs, scholarships, or
              programs you know about.
            </p>
          </div>

          <Link href="/add-opportunity" className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "px-6 py-3 rounded-xl",
                "bg-gray-900 dark:bg-white",
                "text-white dark:text-gray-900",
                "font-semibold text-sm",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-200",
                "whitespace-nowrap",
              )}
            >
              Submit Opportunity
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
