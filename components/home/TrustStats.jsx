"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { trustStats } from "../../data/opportunities.js";
import { cn } from "../../lib/utils.js";

export default function TrustStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
    >
      {trustStats.map((stat, index) => {
        const Icon = Icons[stat.icon] || Icons.Star;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={cn(
              "relative overflow-hidden",
              "p-5 md:p-6",
              "bg-white dark:bg-slate-800",
              "border border-gray-100 dark:border-slate-700",
              "rounded-2xl",
              "text-center",
              "shadow-sm hover:shadow-lg",
              "transition-shadow duration-300",
              "group",
            )}
          >
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-500/5 group-hover:bg-yellow-500/10 blur-xl transition-colors duration-300" />

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="inline-flex mb-3"
            >
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl",
                  "bg-gradient-to-br from-yellow-500 to-orange-500",
                  "flex items-center justify-center",
                  "shadow-md",
                  "group-hover:shadow-yellow-glow",
                  "transition-shadow duration-300",
                )}
              >
                <Icon size={20} className="text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Value */}
            <div
              className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1"
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
    </motion.div>
  );
}
