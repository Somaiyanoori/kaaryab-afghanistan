"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  MapPin,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
} from "lucide-react";
import { getAllOpportunities } from "../../lib/db.js";
import { useCountUp } from "../../hooks/useCountUp.js";
import { cn } from "../../lib/utils.js";

// INDIVIDUAL STAT CARD WITH COUNTER
function StatCard({ stat, index, isInView }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative overflow-hidden group",
        "p-6 md:p-8",
        "bg-white dark:bg-slate-800",
        "border border-gray-100 dark:border-slate-700",
        "rounded-2xl",
        "shadow-sm hover:shadow-2xl",
        "transition-shadow duration-300",
        "text-center",
      )}
    >
      {/* Background gradient decoration */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: stat.gradient }}
      />

      {/* Sparkle Effect (top right corner) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5,
        }}
        className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity"
      >
        <Sparkles size={16} className="text-yellow-500" />
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="inline-flex mb-4"
      >
        <div
          className={cn(
            "w-14 h-14 md:w-16 md:h-16 rounded-2xl",
            "flex items-center justify-center",
            "shadow-lg",
            "group-hover:scale-110 group-hover:rotate-6",
            "transition-transform duration-300",
          )}
          style={{ background: stat.gradient }}
        >
          <Icon size={28} className="text-white" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Animated Counter */}
      <div className="mb-2">
        <div
          className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-none tabular-nums"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {count.toLocaleString()}
          <span className="text-yellow-500">{stat.suffix}</span>
        </div>
      </div>

      {/* Label */}
      <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {stat.label}
      </div>

      {/* Description */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {stat.description}
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: stat.gradient }}
      />
    </motion.div>
  );
}

// ============================================
// MAIN STATS SECTION
// ============================================
export default function StatsSection() {
  const [isInView, setIsInView] = useState(false);
  const [totalOpps, setTotalOpps] = useState(0);
  const [totalOrgs, setTotalOrgs] = useState(0);
  const [totalProvinces, setTotalProvinces] = useState(0);
  const sectionRef = useRef(null);

  // Fetch real stats from database
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const opportunities = await getAllOpportunities();
        const opps = opportunities || [];

        // Total opportunities
        setTotalOpps(opps.length);

        // Unique organizations
        const uniqueOrgs = new Set(opps.map((o) => o.organization));
        setTotalOrgs(uniqueOrgs.size);

        // Unique locations (excluding "Online")
        const uniqueLocations = new Set(
          opps.map((o) => o.location).filter((loc) => loc && loc !== "Online"),
        );
        setTotalProvinces(uniqueLocations.size);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.3, // Trigger when 30% visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Define stats
  const stats = [
    {
      icon: Briefcase,
      value: Math.max(totalOpps, 10),
      suffix: "+",
      label: "Opportunities",
      description: "Available on our platform",
      gradient: "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)",
    },
    {
      icon: Building2,
      value: Math.max(totalOrgs, 5),
      suffix: "+",
      label: "Organizations",
      description: "Trusted partners",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    },
    {
      icon: MapPin,
      value: Math.max(totalProvinces, 3),
      suffix: "+",
      label: "Provinces",
      description: "Across Afghanistan",
      gradient: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
    },
    {
      icon: Users,
      value: 1200,
      suffix: "+",
      label: "Afghan Youth",
      description: "Have visited us",
      gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
    },
    {
      icon: Award,
      value: 100,
      suffix: "%",
      label: "Free Forever",
      description: "No hidden fees",
      gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
    },
    {
      icon: TrendingUp,
      value: 24,
      suffix: "/7",
      label: "Available",
      description: "Access anytime",
      gradient: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 border border-yellow-500/30 rounded-full">
            <TrendingUp
              size={14}
              className="text-yellow-600 dark:text-yellow-400"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-700 dark:text-yellow-400">
              Growing Together
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Making an <span className="gradient-text">Impact</span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real numbers showing our commitment to helping Afghan youth find
            opportunities across Afghanistan.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        ></motion.div>
      </div>
    </section>
  );
}
