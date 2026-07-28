"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlusCircle, ChevronDown } from "lucide-react";
import HeroSearch from "./HeroSearch.jsx";
import FloatingCards from "./FloatingCards.jsx";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

// Statistics data
const HERO_STATS = [
  { value: "500+", label: "Opportunities" },
  { value: "30+", label: "Organizations" },
  { value: "15+", label: "Provinces" },
  { value: "100%", label: "Free" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      <div className="relative container-custom pt-24 pb-20 z-[5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <div
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-4 py-2",
                  "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
                  "border border-yellow-500/30",
                  "rounded-full",
                  "backdrop-blur-sm",
                )}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={14} className="text-yellow-400" />
                </motion.div>
                <span className="text-xs font-semibold text-yellow-300 tracking-wide">
                  🇦🇫 Platform for Afghan Youth
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <span className="block">Find Your</span>
              <motion.span
                className="block gradient-text mt-2"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Next Opportunity
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Discover jobs, scholarships, internships, remote work, and
              skill-building opportunities across Afghanistan — all in one
              place.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <HeroSearch />
            </motion.div>

            {/* CTA Buttons — USING REUSABLE BUTTON */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Button
                href="/opportunities"
                variant="white"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Browse All Opportunities
              </Button>

              <Button
                href="/add-opportunity"
                variant="glass"
                size="lg"
                icon={PlusCircle}
              >
                Add Opportunity
              </Button>
            </motion.div>

            {/* Statistics */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {HERO_STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FloatingCards />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center"
          >
            <ChevronDown size={16} className="text-white/70" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 dark:to-slate-950 pointer-events-none" />
    </section>
  );
}
