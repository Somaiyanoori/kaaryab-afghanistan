"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import SectionHeader from "../shared/SectionHeader.jsx";
import StepCard from "./StepCard.jsx";
import { cn } from "../../lib/utils.js";
import Button from "../ui/Button.jsx";
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

// FIXED positions (no more Math.random)
const CTA_SPARKLES = [
  { top: 10, left: 15, duration: 2 },
  { top: 20, left: 45, duration: 2.5 },
  { top: 30, left: 75, duration: 3 },
  { top: 40, left: 85, duration: 2.2 },
  { top: 50, left: 25, duration: 2.8 },
  { top: 60, left: 55, duration: 3.2 },
  { top: 70, left: 15, duration: 2.4 },
  { top: 80, left: 65, duration: 2.6 },
  { top: 15, left: 90, duration: 3.1 },
  { top: 25, left: 5, duration: 2.9 },
  { top: 35, left: 40, duration: 2.3 },
  { top: 45, left: 70, duration: 2.7 },
  { top: 55, left: 10, duration: 3.3 },
  { top: 65, left: 80, duration: 2.1 },
  { top: 75, left: 30, duration: 2.5 },
  { top: 85, left: 50, duration: 2.8 },
  { top: 12, left: 65, duration: 3 },
  { top: 42, left: 20, duration: 2.4 },
  { top: 72, left: 95, duration: 2.6 },
  { top: 92, left: 35, duration: 2.2 },
];

export default function HowItWorks() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gray-50 dark:bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/3 dark:bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative container-custom">
        <SectionHeader
          badge="How It Works"
          badgeIcon={PlayCircle}
          title="Your Journey to"
          highlightedText="Opportunity"
          description="Four simple steps to find and apply for the perfect opportunity. Start your journey today — it's completely free."
        />

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
            {/* FIXED Sparkles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {CTA_SPARKLES.map((sparkle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: `${sparkle.top}%`,
                    left: `${sparkle.left}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: sparkle.duration,
                    repeat: Infinity,
                    delay: (i * 0.1) % 2,
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <Sparkles size={32} className="text-white" />
                </div>
              </motion.div>

              <h3
                className="text-2xl md:text-4xl font-black text-white mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ready to Start Your Journey?
              </h3>

              <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join thousands of Afghan youth already discovering
                opportunities. It's completely free and takes less than a minute
                to get started.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  href="/opportunities"
                  variant="white"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Browse Opportunities
                </Button>

                <Button href="/cv-builder" variant="glass" size="lg">
                  Build Your CV Free
                </Button>

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
