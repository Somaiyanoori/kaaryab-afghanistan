"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Globe,
  Check,
  Sparkles,
  Home,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

import ErrorState from "../../../components/states/ErrorState.jsx";
import ApplyCard from "../../../components/detail/ApplyCard.jsx";
import SimilarOpportunities from "../../../components/detail/SimilarOpportunities.jsx";
import CategoryBadge from "../../../components/opportunities/CategoryBadge.jsx";
import { getAllOpportunities } from "../../../lib/db.js";
import {
  getCategoryColors,
  getInitials,
  formatDate,
  formatRelativeDate,
  cn,
} from "../../../lib/utils.js";

// ============================================
// NORMALIZE DB OPPORTUNITY
// Maps snake_case → camelCase
// ============================================
function normalizeOpportunity(opp) {
  return {
    id: opp.id,
    slug: opp.slug || opp.id,
    title: opp.title,
    organization: opp.organization,
    category: opp.category,
    location: opp.location,
    type: opp.type,
    deadline: opp.deadline,
    shortDesc: opp.short_desc || opp.shortDesc,
    description: opp.description,
    requirements: opp.requirements || [],
    applyLink: opp.apply_link || opp.applyLink,
    tags: opp.tags || [],
    contactEmail: opp.contact_email || opp.contactEmail,
    contactPhone: opp.contact_phone || opp.contactPhone,
    salary: opp.salary,
    duration: opp.duration,
    seats: opp.seats,
    gender: opp.gender,
    language: opp.language,
    benefits: opp.benefits || [],
    featured: opp.featured || false,
    urgent: opp.urgent || false,
    verified: opp.verified || false,
    logo: opp.logo,
    views: opp.views || 0,
    saves: opp.saves || 0,
    postedDate:
      opp.posted_date || opp.postedDate || opp.created_at?.split("T")[0],
  };
}

// ============================================
// MAIN PAGE
// ============================================
export default function OpportunityDetailPage({ params }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  const [dbOpportunities, setDbOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================
  // FETCH DB OPPORTUNITIES
  // ============================================
  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      try {
        const data = await getAllOpportunities();
        setDbOpportunities(data || []);
      } catch (error) {
        console.error("Failed to fetch opportunities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // MERGE ALL OPPORTUNITIES
  const allOpportunities = dbOpportunities.map(normalizeOpportunity);

  // FIND OPPORTUNITY BY ID OR SLUG

  const opportunity = allOpportunities.find(
    (opp) => opp.id === id || opp.slug === id,
  );

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Loading opportunity...
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // NOT FOUND STATE
  // ============================================
  if (mounted && !opportunity) {
    return (
      <ErrorState
        fullPage
        title="Opportunity Not Found"
        description="The opportunity you're looking for doesn't exist or has been removed."
        actionLabel="Browse Opportunities"
        actionHref="/opportunities"
      />
    );
  }

  if (!opportunity) return null;

  const colors = getCategoryColors(opportunity.category);
  const initials = getInitials(opportunity.organization);

  return (
    <>
      {/* HERO HEADER */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-custom">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs mb-6 text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
            >
              <Home size={12} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} />
            <Link
              href="/opportunities"
              className="hover:text-yellow-400 transition-colors"
            >
              Opportunities
            </Link>
            <ChevronRight size={12} />
            <span className="text-white truncate max-w-[200px]">
              {opportunity.title}
            </span>
          </motion.nav>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col md:flex-row items-start gap-6"
          >
            {/* Logo */}
            <div
              className={cn(
                "flex-shrink-0",
                "w-20 h-20 md:w-24 md:h-24 rounded-2xl",
                "flex items-center justify-center",
                "shadow-2xl",
                "text-white font-black text-2xl md:text-3xl",
                "overflow-hidden",
              )}
              style={{ background: colors.solidGradient }}
            >
              {opportunity.logo ? (
                <img
                  src={opportunity.logo}
                  alt={opportunity.organization}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="drop-shadow-md">{initials}</span>
              )}
            </div>

            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <CategoryBadge category={opportunity.category} />

                {opportunity.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                    <Sparkles size={10} />
                    FEATURED
                  </span>
                )}

                {opportunity.urgent && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    <AlertCircle size={10} className="animate-pulse" />
                    URGENT
                  </span>
                )}

                {opportunity.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    <Check size={10} />
                    VERIFIED
                  </span>
                )}
              </div>

              <h1
                className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {opportunity.title}
              </h1>

              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <Building2 size={16} />
                <span className="text-base font-medium">
                  {opportunity.organization}
                </span>
              </div>

              <div className="flex items-center flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white">
                  <MapPin size={14} />
                  <span>{opportunity.location}</span>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                    opportunity.type === "Remote" &&
                      "bg-green-500/20 text-green-300 border border-green-500/30",
                    opportunity.type === "On-site" &&
                      "bg-blue-500/20 text-blue-300 border border-blue-500/30",
                    opportunity.type === "Hybrid" &&
                      "bg-purple-500/20 text-purple-300 border border-purple-500/30",
                  )}
                >
                  <Globe size={14} />
                  <span className="font-semibold">{opportunity.type}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-white">
                  <Calendar size={14} />
                  <span>
                    Posted {formatRelativeDate(opportunity.postedDate)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-gray-50 dark:bg-slate-950 py-12 md:py-16 min-h-screen">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Opportunity
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {opportunity.description}
                </p>
              </motion.div>

              {/* Requirements */}
              {opportunity.requirements &&
                opportunity.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Requirements
                    </h2>
                    <ul className="space-y-3">
                      {opportunity.requirements.map((req, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                            <Check
                              size={12}
                              className="text-green-600 dark:text-green-400"
                            />
                          </div>
                          <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                            {req}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

              {/* Benefits */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Benefits & Perks
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {opportunity.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                          <Sparkles
                            size={12}
                            className="text-yellow-600 dark:text-yellow-400"
                          />
                        </div>
                        <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-5">
                  Opportunity Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Calendar,
                      label: "Deadline",
                      value: formatDate(opportunity.deadline),
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: opportunity.location,
                    },
                    {
                      icon: Globe,
                      label: "Work Type",
                      value: opportunity.type,
                    },
                    {
                      icon: Users,
                      label: "Gender",
                      value: opportunity.gender || "Any",
                    },
                    ...(opportunity.salary
                      ? [
                          {
                            icon: DollarSign,
                            label: "Compensation",
                            value: opportunity.salary,
                          },
                        ]
                      : []),
                    ...(opportunity.duration
                      ? [
                          {
                            icon: Clock,
                            label: "Duration",
                            value: opportunity.duration,
                          },
                        ]
                      : []),
                    ...(opportunity.seats
                      ? [
                          {
                            icon: Users,
                            label: "Available Seats",
                            value: opportunity.seats,
                          },
                        ]
                      : []),
                    ...(opportunity.language
                      ? [
                          {
                            icon: Globe,
                            label: "Language",
                            value: opportunity.language,
                          },
                        ]
                      : []),
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <div className="w-9 h-9 rounded-lg bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon
                            size={16}
                            className="text-yellow-600 dark:text-yellow-400"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Tags */}
              {opportunity.tags && opportunity.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-slate-700 shadow-sm"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/opportunities?search=${encodeURIComponent(tag)}`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-yellow-100 dark:bg-slate-700 dark:hover:bg-yellow-500/20 text-gray-700 hover:text-yellow-700 dark:text-gray-300 dark:hover:text-yellow-400 text-sm font-medium rounded-full border border-gray-200 hover:border-yellow-500 dark:border-slate-600 cursor-pointer transition-all duration-200"
                        >
                          #{tag}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* RIGHT: APPLY CARD */}
            <div className="lg:col-span-1">
              <ApplyCard opportunity={opportunity} />
            </div>
          </div>

          {/* SIMILAR */}
          <SimilarOpportunities
            current={opportunity}
            allOpportunities={allOpportunities}
          />
        </div>
      </section>
    </>
  );
}
