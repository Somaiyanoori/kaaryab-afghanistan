"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, MapPin, Clock } from "lucide-react";
import { cn } from "../../lib/utils.js";

// Sample cards to show floating in hero
const FLOATING_CARDS = [
  {
    id: 1,
    title: "Frontend Developer",
    org: "Kabul Tech Community",
    category: "Job",
    location: "Kabul",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
    delay: 0,
  },
  {
    id: 2,
    title: "Women in Tech Scholarship",
    org: "Global Learning Foundation",
    category: "Scholarship",
    location: "Online",
    icon: Award,
    color: "from-purple-500 to-purple-600",
    delay: 0.2,
  },
  {
    id: 3,
    title: "Web Design Internship",
    org: "Kandahar Digital Agency",
    category: "Internship",
    location: "Kandahar",
    icon: GraduationCap,
    color: "from-teal-500 to-teal-600",
    delay: 0.4,
  },
];

export default function FloatingCards() {
  return (
    <div className="relative hidden lg:block w-full h-[500px]">
      {FLOATING_CARDS.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50, rotate: -5 + index * 3 }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
              rotate: -5 + index * 3,
            }}
            transition={{
              opacity: { duration: 0.5, delay: card.delay },
              y: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              },
            }}
            className={cn(
              "absolute",
              "bg-white/95 dark:bg-slate-800/95",
              "backdrop-blur-md",
              "rounded-2xl",
              "shadow-2xl",
              "border border-white/20",
              "p-5",
              "w-72",
              index === 0 && "top-0 right-8",
              index === 1 && "top-40 right-40 z-10",
              index === 2 && "bottom-8 right-16",
            )}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
          >
            {/* Category Badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl",
                  "flex items-center justify-center",
                  "bg-gradient-to-br",
                  card.color,
                  "shadow-lg",
                )}
              >
                <Icon size={22} className="text-white" />
              </div>
              <span
                className={cn(
                  "px-3 py-1",
                  "text-xs font-semibold",
                  "bg-gradient-to-r",
                  card.color,
                  "text-white",
                  "rounded-full",
                )}
              >
                {card.category}
              </span>
            </div>

            {/* Content */}
            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
              {card.org}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{card.location}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>15 days left</span>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl",
                "bg-gradient-to-r",
                card.color,
              )}
            />
          </motion.div>
        );
      })}

      {/* Decorative Glow Orbs */}
      <div className="absolute top-20 right-32 w-20 h-20 bg-yellow-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
    </div>
  );
}
