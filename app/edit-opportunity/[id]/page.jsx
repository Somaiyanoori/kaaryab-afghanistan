"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
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

import ApplyCard from "../../../components/detail/ApplyCard.jsx";
import SimilarOpportunities from "../../../components/detail/SimilarOpportunities.jsx";
import CategoryBadge from "../../../components/opportunities/CategoryBadge.jsx";
import Badge from "../../../components/ui/Badge.jsx";
import Button from "../../../components/ui/Button.jsx";
import Card from "../../../components/ui/Card.jsx";
import Avatar from "../../../components/ui/Avatar.jsx";
import { opportunities } from "../../../data/opportunities.js";
import { useOpportunitiesStore } from "../../../store/index.js";
import {
  getCategoryColors,
  formatDate,
  formatRelativeDate,
  cn,
} from "../../../lib/utils.js";

export default function OpportunityDetailPage({ params }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  const userOpportunities = useOpportunitiesStore(
    (state) => state.userOpportunities,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const allOpportunities = mounted
    ? [...opportunities, ...userOpportunities]
    : opportunities;

  const opportunity = allOpportunities.find(
    (opp) => opp.id === id || opp.slug === id,
  );

  // Not Found State
  if (mounted && !opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <AlertCircle size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Opportunity Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The opportunity you're looking for doesn't exist or has been
            removed.
          </p>
          <Button
            href="/opportunities"
            variant="primary"
            size="md"
            icon={ArrowLeft}
          >
            Browse Opportunities
          </Button>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const colors = getCategoryColors(opportunity.category);

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
            {/* Logo/Avatar */}
            <Avatar
              src={opportunity.logo}
              name={opportunity.organization}
              size="2xl"
              gradient={colors.solidGradient}
              className="!rounded-2xl"
            />

            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
              {/* Badges Row */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <CategoryBadge category={opportunity.category} />

                {opportunity.featured && (
                  <Badge variant="solid" size="md" icon={Sparkles}>
                    FEATURED
                  </Badge>
                )}

                {opportunity.urgent && (
                  <Badge variant="danger" size="md" icon={AlertCircle} pulse>
                    URGENT
                  </Badge>
                )}

                {opportunity.verified && (
                  <Badge variant="info" size="md" icon={Check}>
                    VERIFIED
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {opportunity.title}
              </h1>

              {/* Organization */}
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <Building2 size={16} />
                <span className="text-base font-medium">
                  {opportunity.organization}
                </span>
              </div>

              {/* Quick Meta */}
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
            {/* LEFT: MAIN CONTENT */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="default" padding="lg">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About This Opportunity
                  </h2>
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {opportunity.description}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Requirements */}
              {opportunity.requirements &&
                opportunity.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card variant="default" padding="lg">
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
                    </Card>
                  </motion.div>
                )}

              {/* Benefits */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card variant="default" padding="lg">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Benefits & Perks
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {opportunity.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mt-0.5">
                            <Sparkles
                              size={12}
                              className="text-yellow-600 dark:text-yellow-400"
                            />
                          </div>
                          <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                            {benefit}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              )}

              {/* Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card variant="default" padding="lg">
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
                </Card>
              </motion.div>

              {/* Tags */}
              {opportunity.tags && opportunity.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card variant="default" padding="lg">
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
                  </Card>
                </motion.div>
              )}
            </div>

            {/* RIGHT: STICKY APPLY CARD */}
            <div className="lg:col-span-1">
              <ApplyCard opportunity={opportunity} />
            </div>
          </div>

          {/* SIMILAR OPPORTUNITIES */}
          <SimilarOpportunities
            current={opportunity}
            allOpportunities={allOpportunities}
          />
        </div>
      </section>
    </>
  );
}
