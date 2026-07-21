"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, ArrowRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader.jsx";
import CategoryCard from "./CategoryCard.jsx";
import { categories, opportunities } from "../../data/opportunities.js";
import { useOpportunitiesStore } from "../../store/index.js";
import { cn } from "../../lib/utils.js";
import { useEffect, useState } from "react";

export default function CategoriesSection() {
  const [mounted, setMounted] = useState(false);
  const userOpportunities = useOpportunitiesStore(
    (state) => state.userOpportunities,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combine mock data with user submitted (only after mount to prevent hydration mismatch)
  const allOpportunities = mounted
    ? [...opportunities, ...userOpportunities]
    : opportunities;

  // Calculate count for each category
  const getCategoryCount = (categoryName) => {
    return allOpportunities.filter((opp) => opp.category === categoryName)
      .length;
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* ============================================
          Content Container
      ============================================ */}
      <div className="relative container-custom">
        {/* Section Header */}
        <SectionHeader
          badge="Categories"
          badgeIcon={LayoutGrid}
          title="Find Opportunities by"
          highlightedText="Category"
          description="Browse through diverse opportunity types tailored to your career goals, skills, and interests. Every path starts with a choice."
        />

        {/* ============================================
            Categories Grid
        ============================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={getCategoryCount(category.name)}
              index={index}
            />
          ))}

          {/* View All Card (Bonus 8th card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: categories.length * 0.08,
            }}
          >
            <Link href="/opportunities" className="block group h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "relative overflow-hidden",
                  "bg-gradient-to-br from-yellow-500 via-orange-500 to-blue-600",
                  "rounded-2xl p-6",
                  "shadow-xl hover:shadow-2xl",
                  "transition-shadow duration-300",
                  "cursor-pointer",
                  "h-full",
                  "flex flex-col justify-between",
                )}
              >
                {/* Animated Sparkles Background */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <LayoutGrid
                        size={26}
                        className="text-white"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    View All
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/90 mb-5 line-clamp-2">
                    Explore all{" "}
                    {mounted ? allOpportunities.length : opportunities.length}{" "}
                    opportunities in one place
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Browse Now
                  </span>

                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
                  >
                    <ArrowRight size={16} className="text-gray-900" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* ============================================
            Bottom CTA
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <Link href="/add-opportunity">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex items-center gap-2",
                "px-6 py-3 rounded-xl",
                "bg-gray-900 dark:bg-white",
                "text-white dark:text-gray-900",
                "font-semibold text-sm",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-200",
              )}
            >
              <span>Submit an Opportunity</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
