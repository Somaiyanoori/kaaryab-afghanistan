"use client";

import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { cn, getInitials } from "../../lib/utils.js";
import Avatar from "../ui/Avatar.jsx";
// Random colorful gradients for avatars
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #EAB308 0%, #F97316 100%)",
  "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
  "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
  "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
  "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
  "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
];

export default function TestimonialCard({ testimonial, index }) {
  const initials = getInitials(testimonial.name);
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative overflow-hidden",
          "h-full",
          "bg-white dark:bg-slate-800",
          "border border-gray-100 dark:border-slate-700",
          "rounded-2xl",
          "p-6 md:p-7",
          "shadow-sm hover:shadow-2xl",
          "transition-shadow duration-300",
          "flex flex-col",
          "group",
        )}
      >
        {/* Large Decorative Quote (Background) */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Quote size={80} className="text-yellow-500 rotate-180" />
        </div>

        {/* Top Colored Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: gradient }}
        />

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4 relative z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1 + i * 0.05 + 0.3,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Star
                size={16}
                className={cn(
                  i < testimonial.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 dark:text-gray-600",
                )}
              />
            </motion.div>
          ))}
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
            {testimonial.rating}.0
          </span>
        </div>

        {/* Testimonial Text */}
        <blockquote className="relative z-10 mb-6 flex-1">
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed italic">
            "{testimonial.text}"
          </p>
        </blockquote>

        {/* Opportunity Found Badge */}
        {testimonial.opportunity && (
          <div
            className={cn(
              "mb-5 px-3 py-2",
              "bg-yellow-50 dark:bg-yellow-500/10",
              "border border-yellow-200 dark:border-yellow-500/20",
              "rounded-lg",
              "relative z-10",
            )}
          >
            <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
              🎉 {testimonial.opportunity}
            </p>
          </div>
        )}

        {/* User Info (Avatar + Name + Details) */}
        <div className="flex items-center gap-3 relative z-10 pt-4 border-t border-gray-100 dark:border-slate-700">
          {/* Avatar with Initials */}
          <Avatar
            src={testimonial.avatar}
            name={testimonial.name}
            size="md"
            gradient={gradient}
            ring
          />

          {/* Name + Role + Location */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
              {testimonial.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span className="truncate">{testimonial.role}</span>
              {testimonial.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-0.5">
                    <MapPin size={10} />
                    <span className="truncate">{testimonial.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
