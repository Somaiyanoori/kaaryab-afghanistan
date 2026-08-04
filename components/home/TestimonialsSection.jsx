"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader.jsx";
import TestimonialCard from "./TestimonialCard.jsx";
import TrustStats from "./TrustStats.jsx";
import { testimonials } from "../../data/opportunities.js";
import { cn } from "../../lib/utils.js";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate carousel on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-900">
      {/* DECORATIVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Diagonal Lines Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 20px)`,
        }}
      />

      {/* CONTENT CONTAINER */}
      <div className="relative container-custom">
        {/* Section Header */}
        <SectionHeader
          badge="Testimonials"
          badgeIcon={MessageSquare}
          title="Loved by Afghan"
          highlightedText="Youth"
          description="Real stories from real users who found their next opportunity through KaarYab. Your success story could be next!"
        />

        {/* DESKTOP: GRID LAYOUT (3 columns) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* MOBILE: CAROUSEL */}
        <div className="md:hidden mb-12">
          <div className="relative">
            {/* Current Card */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                >
                  <TestimonialCard
                    testimonial={testimonials[currentIndex]}
                    index={0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              {/* Previous Button */}
              <motion.button
                onClick={handlePrev}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "w-10 h-10 rounded-full",
                  "bg-white dark:bg-slate-800",
                  "border border-gray-200 dark:border-slate-700",
                  "text-gray-700 dark:text-gray-300",
                  "flex items-center justify-center",
                  "shadow-md hover:shadow-lg",
                  "hover:bg-yellow-500 hover:text-gray-900 hover:border-yellow-500",
                  "transition-all duration-200",
                )}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      currentIndex === index
                        ? "w-8 h-2 bg-yellow-500"
                        : "w-2 h-2 bg-gray-300 dark:bg-gray-600",
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "w-10 h-10 rounded-full",
                  "bg-white dark:bg-slate-800",
                  "border border-gray-200 dark:border-slate-700",
                  "text-gray-700 dark:text-gray-300",
                  "flex items-center justify-center",
                  "shadow-md hover:shadow-lg",
                  "hover:bg-yellow-500 hover:text-gray-900 hover:border-yellow-500",
                  "transition-all duration-200",
                )}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* TRUST STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-12 md:pt-16 border-t border-gray-100 dark:border-slate-800"
        >
          {/* Stats Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
              Trusted by Afghan Youth Worldwide
            </p>
          </div>

          {/* Stats Grid */}
          <TrustStats />
        </motion.div>

        {/* SHARE YOUR STORY CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div
            className={cn(
              "inline-flex items-center gap-2",
              "px-5 py-2.5",
              "bg-gray-100 dark:bg-slate-800",
              "rounded-full",
              "text-sm text-gray-700 dark:text-gray-300",
            )}
          >
            <span>💬</span>
            <span>Have a success story? </span>
            <a
              href="/contact"
              className="font-semibold text-yellow-600 dark:text-yellow-400 hover:underline"
            >
              Share it with us →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
