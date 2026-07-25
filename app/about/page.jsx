"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Target,
  Users,
  Sparkles,
  Award,
  Globe,
  Shield,
  Zap,
  BookOpen,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  HandshakeIcon,
} from "lucide-react";
import SectionHeader from "../../components/shared/SectionHeader.jsx";
import { cn } from "../../lib/utils.js";

// ============================================
// VALUES DATA
// ============================================
const VALUES = [
  {
    icon: Heart,
    title: "Free Forever",
    description:
      "KaarYab is 100% free and always will be. No hidden fees, no premium tiers.",
    gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
  },
  {
    icon: Shield,
    title: "Trusted & Safe",
    description:
      "All opportunities are verified. We prioritize your safety and privacy.",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
  },
  {
    icon: Users,
    title: "Inclusive",
    description:
      "Built for everyone in Afghanistan — regardless of gender, age, or background.",
    gradient: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
  },
  {
    icon: Globe,
    title: "Accessible",
    description:
      "Available in English, Dari, and Pashto. Works on any device, anywhere.",
    gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
  },
];

// ============================================
// STATS DATA
// ============================================
const STATS = [
  { value: "500+", label: "Opportunities Listed", icon: Sparkles },
  { value: "30+", label: "Partner Organizations", icon: HandshakeIcon },
  { value: "15+", label: "Provinces Covered", icon: Globe },
  { value: "1,200+", label: "Youth Helped", icon: Users },
];

// ============================================
// FEATURES DATA
// ============================================
const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Updates",
    description:
      "Get instant access to the latest opportunities as they are posted.",
  },
  {
    icon: BookOpen,
    title: "Diverse Categories",
    description:
      "Jobs, internships, scholarships, courses, remote work, and more.",
  },
  {
    icon: Award,
    title: "CV Builder",
    description: "Create a professional CV in minutes with our free builder.",
  },
  {
    icon: Lightbulb,
    title: "Smart Filters",
    description:
      "Find exactly what you need with our powerful search and filter system.",
  },
];

// ============================================
// TIMELINE DATA
// ============================================
const TIMELINE = [
  {
    year: "2024",
    title: "The Idea",
    description:
      "KaarYab was born from the need to connect Afghan youth with opportunities scattered across the web.",
    color: "#EAB308",
  },
  {
    year: "2024",
    title: "Building the Platform",
    description:
      "Developed with modern technology to provide the best user experience possible.",
    color: "#3B82F6",
  },
  {
    year: "2025",
    title: "Launch",
    description:
      "Officially launched to help thousands of Afghan youth find their next opportunity.",
    color: "#A855F7",
  },
  {
    year: "Future",
    title: "Growing Together",
    description:
      "Continuously improving with new features, more languages, and expanded reach.",
    color: "#22C55E",
  },
];

// ============================================
// TEAM DATA
// ============================================
const TEAM = [
  {
    name: "The Vision",
    role: "Empowering Afghan Youth",
    description:
      "To create equal access to opportunities for every young person in Afghanistan.",
    initials: "V",
    gradient: "linear-gradient(135deg, #EAB308 0%, #F97316 100%)",
  },
  {
    name: "The Mission",
    role: "Connecting Talent to Opportunity",
    description:
      "Building bridges between opportunities and the talented youth who deserve them.",
    initials: "M",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
  },
  {
    name: "The Community",
    role: "Made With Love in Afghanistan",
    description:
      "A platform built by and for the Afghan community, with heart and dedication.",
    initials: "C",
    gradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ============================================
          HERO HEADER
      ============================================ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"
          >
            <Heart size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">
              Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            About <span className="gradient-text">KaarYab</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto"
          >
            We're on a mission to empower Afghan youth by connecting them with
            the best opportunities across Afghanistan and beyond.
          </motion.p>
        </div>
      </section>

      {/* ============================================
          MISSION SECTION
      ============================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-yellow-100 dark:bg-yellow-500/20 rounded-full">
                <Target
                  size={14}
                  className="text-yellow-600 dark:text-yellow-400"
                />
                <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">
                  Our Mission
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Empowering the Next Generation of{" "}
                <span className="gradient-text">Afghan Leaders</span>
              </h2>

              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  KaarYab was born from a simple but powerful idea: every young
                  person in Afghanistan deserves equal access to opportunities
                  that can shape their future.
                </p>
                <p>
                  In a country full of talent and potential, information about
                  jobs, scholarships, and internships is often scattered across
                  social media groups, websites, and word of mouth. Many
                  opportunities are missed simply because people don't know they
                  exist.
                </p>
                <p>
                  We're changing that by creating a single, beautiful, and
                  easy-to-use platform where every Afghan youth can discover,
                  save, and pursue the opportunities they deserve.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/opportunities">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-sm rounded-xl shadow-lg transition-all"
                  >
                    <span>Explore Opportunities</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Background */}
                <div className="aspect-square bg-gradient-to-br from-yellow-400 via-orange-500 to-blue-600 p-12 flex items-center justify-center">
                  {/* Animated Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                  >
                    <Rocket
                      size={80}
                      className="text-white"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Floating particles */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
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
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATISTICS BANNER
      ============================================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Background decoration */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl" />

                  {/* Icon */}
                  <div className="relative inline-flex mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                      <Icon
                        size={22}
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div
                    className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          CORE VALUES
      ============================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <SectionHeader
            badge="Our Values"
            badgeIcon={Heart}
            title="What Drives"
            highlightedText="Us Forward"
            description="These core values shape everything we do and every decision we make."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative overflow-hidden p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow group"
                >
                  {/* Background decoration */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl"
                    style={{ background: value.gradient }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ background: value.gradient }}
                  >
                    <Icon size={24} className="text-white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          TIMELINE
      ============================================ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
        <div className="container-custom">
          <SectionHeader
            badge="Our Journey"
            badgeIcon={Rocket}
            title="How We"
            highlightedText="Got Here"
            description="A brief timeline of the KaarYab journey."
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex items-start gap-4 md:gap-6"
              >
                {/* Year Circle */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                    }}
                  >
                    <span className="text-xs md:text-sm font-black text-white text-center leading-tight">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES GRID
      ============================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <SectionHeader
            badge="What We Offer"
            badgeIcon={Sparkles}
            title="Everything You"
            highlightedText="Need"
            description="Powerful features designed to make your opportunity search easier and more effective."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-yellow-500 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center mb-4">
                    <Icon
                      size={22}
                      className="text-yellow-600 dark:text-yellow-400"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          TEAM SECTION
      ============================================ */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
        <div className="container-custom">
          <SectionHeader
            badge="Our Pillars"
            badgeIcon={Users}
            title="Built With"
            highlightedText="Purpose"
            description="Three pillars that define who we are and what we stand for."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Avatar */}
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg text-white font-black text-3xl"
                  style={{ background: member.gradient }}
                >
                  {member.initials}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
      ============================================ */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-16 text-center shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #EAB308 0%, #F97316 50%, #3B82F6 100%)",
            }}
          >
            {/* Animated particles */}
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
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex mb-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <Sparkles size={32} className="text-white" />
                </div>
              </motion.div>

              <h2
                className="text-3xl md:text-5xl font-black text-white mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ready to Find Your Opportunity?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of Afghan youth who are already discovering
                amazing opportunities every day.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/opportunities">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-bold text-sm rounded-xl shadow-xl group"
                  >
                    <span>Browse Opportunities</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-sm rounded-xl"
                  >
                    Get in Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
