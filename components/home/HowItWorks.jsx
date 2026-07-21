"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import SectionHeader from "../shared/SectionHeader.jsx";
import StepCard from "./StepCard.jsx";
import { cn } from "../../lib/utils.js";

// ============================================
// STEPS DATA
// ============================================
const STEPS = [
  {
    id: 1,
    icon: "Search",
    title: "Browse Opportunities",
    description:
      "Explore hundreds of opportunities across Afghanistan. From jobs and internships to scholarships and remote work — everything in one place.",
    features: ["Real-time updates", "All categories", "Verified sources"],
    color: "#EAB308",
    gradient: "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
    nextColor: "#3B82F6",
  },
  {
    id: 2,
    icon: "SlidersHorizontal",
    title: "Filter & Refine",
    description:
      "Use powerful filters to find exactly what fits your needs. Filter by category, location, work type, deadline, and more to save time.",
    features: ["Smart filters", "Save searches", "Quick sort"],
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    nextColor: "#A855F7",
  },
  {
    id: 3,
    icon: "BookmarkCheck",
    title: "Save Your Favorites",
    description:
      "Bookmark opportunities you love. Come back anytime to review your saved list. Never miss a chance again with our organized dashboard.",
    features: ["Unlimited saves", "Organized list", "Deadline tracking"],
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
    nextColor: "#22C55E",
  },
  {
    id: 4,
    icon: "Send",
    title: "Apply with Confidence",
    description:
      "Ready to apply? Click through to the official application page. Build your CV with our free tool and put your best foot forward.",
    features: ["Free CV builder", "Direct links", "Track applications"],
    color: "#22C55E",
    gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
    nextColor: null,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* ============================================
          DECORATIVE BACKGROUND
      ============================================ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/3 dark:bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ============================================
          CONTENT CONTAINER
      ============================================ */}
      <div className="relative container-custom">
        {/* Section Header */}
        <SectionHeader
          badge="How It Works"
          badgeIcon={PlayCircle}
          title="Your Journey to"
          highlightedText="Opportunity"
          description="Four simple steps to find and apply for the perfect opportunity. Start your journey today — it's completely free."
        />

        {/* ============================================
            STEPS CONTAINER
        ============================================ */}
        <div className="max-w-5xl mx-auto mt-12 md:mt-16 space-y-4">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </div>

        {/* ============================================
            BOTTOM CTA CARD
        ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-20 max-w-4xl mx-auto"
        >
          <div
            className={cn(
              "relative overflow-hidden",
              "rounded-3xl",
              "p-8 md:p-12",
              "shadow-2xl",
              "text-center",
            )}
            style={{
              background:
                "linear-gradient(135deg, #EAB308 0%, #F97316 50%, #3B82F6 100%)",
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
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
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <Sparkles size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h3
                className="text-2xl md:text-4xl font-black text-white mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ready to Start Your Journey?
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join thousands of Afghan youth already discovering
                opportunities. It's completely free and takes less than a minute
                to get started.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/opportunities">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "px-6 py-3.5 rounded-xl",
                      "bg-white text-gray-900",
                      "font-bold text-sm",
                      "shadow-xl hover:shadow-2xl",
                      "transition-all duration-200",
                      "group",
                    )}
                  >
                    <span>Browse Opportunities</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>

                <Link href="/cv-builder">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "px-6 py-3.5 rounded-xl",
                      "bg-white/10 hover:bg-white/20",
                      "backdrop-blur-sm",
                      "border-2 border-white/30",
                      "text-white",
                      "font-bold text-sm",
                      "transition-all duration-200",
                    )}
                  >
                    <span>Build Your CV Free</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
