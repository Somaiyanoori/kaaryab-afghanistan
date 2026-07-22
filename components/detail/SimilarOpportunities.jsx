"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import OpportunityCard from "../opportunities/OpportunityCard.jsx";

export default function SimilarOpportunities({ current, allOpportunities }) {
  // Find similar opportunities (same category, exclude current)
  const similar = allOpportunities
    .filter((opp) => opp.id !== current.id && opp.category === current.category)
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={20} className="text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Similar Opportunities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {similar.map((opp, index) => (
            <OpportunityCard key={opp.id} opportunity={opp} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
