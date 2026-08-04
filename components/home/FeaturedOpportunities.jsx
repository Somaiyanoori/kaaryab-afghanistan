"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import { isPast, parseISO } from "date-fns";

import SectionHeader from "../shared/SectionHeader.jsx";
import OpportunityCard from "../opportunities/OpportunityCard.jsx";
import OpportunityCardSkeleton from "../opportunities/OpportunityCardSkeleton.jsx";
import Button from "../ui/Button.jsx";
import { getAllOpportunities } from "../../lib/db.js";
import { cn } from "../../lib/utils.js";

// Normalize DB opportunity
function normalizeOpp(opp) {
  return {
    id: opp.id,
    slug: opp.slug || opp.id,
    title: opp.title,
    organization: opp.organization,
    category: opp.category,
    location: opp.location,
    type: opp.type,
    deadline: opp.deadline,
    shortDesc: opp.short_desc,
    description: opp.description,
    requirements: opp.requirements || [],
    applyLink: opp.apply_link,
    tags: opp.tags || [],
    featured: opp.featured || false,
    urgent: opp.urgent || false,
    verified: opp.verified || false,
    views: opp.views || 0,
    saves: opp.saves || 0,
    postedDate: opp.posted_date || opp.created_at?.split("T")[0],
  };
}

export default function FeaturedOpportunities() {
  const [mounted, setMounted] = useState(false);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOpportunities();
        const normalized = data.map(normalizeOpp);
        setOpportunities(normalized);
      } catch (error) {
        console.error("Failed to load:", error);
      } finally {
        setMounted(true);
      }
    };

    fetchData();
  }, []);

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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom">
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

          <div className="hidden md:block flex-shrink-0">
            <Button
              href="/opportunities"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              View All
            </Button>
          </div>
        </div>

        {!mounted ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <OpportunityCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredOpportunities.length > 0 ? (
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
          <div className="text-center py-16">
            <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No featured opportunities right now. Check back soon!
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:hidden text-center"
        >
          <Button
            href="/opportunities"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            fullWidth
          >
            Browse All Opportunities
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "mt-12 md:mt-16 p-6 md:p-8",
            "bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-blue-500/10",
            "border border-yellow-500/20 rounded-2xl",
            "flex flex-col md:flex-row items-center gap-6",
          )}
        >
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
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

          <div className="flex-shrink-0">
            <Button href="/add-opportunity" variant="dark" size="md">
              Submit Opportunity
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
