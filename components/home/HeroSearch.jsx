"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import AutocompleteSearch from "../opportunities/AutocompleteSearch.jsx";
import { getAllOpportunities } from "../../lib/db.js";
import { cn } from "../../lib/utils.js";

// Quick filter suggestions
const QUICK_FILTERS = [
  { label: "Jobs", category: "Job" },
  { label: "Scholarships", category: "Scholarship" },
  { label: "Remote Work", category: "Remote Work" },
  { label: "Internships", category: "Internship" },
  { label: "Online Courses", category: "Online Course" },
];

// Normalize function
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
    shortDesc: opp.short_desc || opp.shortDesc,
    description: opp.description,
    tags: opp.tags || [],
  };
}

export default function HeroSearch() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOpportunities();
        setOpportunities((data || []).map(normalizeOpp));
      } catch (error) {
        console.error("Hero search fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleQuickFilter = (category) => {
    router.push(`/opportunities?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Autocomplete Search */}
      <AutocompleteSearch
        opportunities={opportunities}
        placeholder="Search jobs, scholarships, internships..."
        className="shadow-2xl"
      />

      {/* Quick Filter Chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
      >
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mr-2">
          <TrendingUp size={12} />
          <span className="hidden sm:inline">Popular:</span>
        </div>
        {QUICK_FILTERS.map((filter, index) => (
          <motion.button
            key={filter.category}
            onClick={() => handleQuickFilter(filter.category)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.05 }}
            className={cn(
              "px-3.5 py-1.5",
              "text-xs font-medium",
              "bg-white/10 hover:bg-white/20",
              "border border-white/20 hover:border-yellow-500/50",
              "text-white",
              "rounded-full",
              "transition-all duration-200",
              "backdrop-blur-sm",
            )}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
