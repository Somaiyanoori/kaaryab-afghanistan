"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "../../lib/utils.js";

export default function StepCard({ step, index, isLast }) {
  const IconComponent = Icons[step.icon] || Icons.Circle;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="relative"
    >
      <div
        className={cn(
          "flex flex-col md:flex-row items-center gap-6 md:gap-12",
          isEven ? "md:flex-row" : "md:flex-row-reverse",
        )}
      >
        {/* ============================================
            LEFT/RIGHT: BIG NUMBER + ICON CIRCLE
        ============================================ */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: isEven ? -5 : 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex-shrink-0"
        >
          {/* Main Circle */}
          <div
            className={cn(
              "relative",
              "w-32 h-32 md:w-40 md:h-40",
              "rounded-full",
              "flex items-center justify-center",
              "shadow-2xl",
              "group",
            )}
            style={{ background: step.gradient }}
          >
            {/* Animated Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: step.color }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />

            {/* Second Animated Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: step.color }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5 + 0.5,
              }}
            />

            {/* Icon */}
            <IconComponent
              size={48}
              className="text-white relative z-10 drop-shadow-lg"
              strokeWidth={2}
            />

            {/* Step Number Badge */}
            <div
              className={cn(
                "absolute -top-2 -right-2",
                "w-12 h-12 rounded-full",
                "bg-white dark:bg-slate-900",
                "shadow-lg",
                "flex items-center justify-center",
                "border-4",
                "z-20",
              )}
              style={{ borderColor: step.color }}
            >
              <span
                className="text-lg font-black"
                style={{ color: step.color }}
              >
                {index + 1}
              </span>
            </div>

            {/* Sparkle decorations */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                style={{
                  top: `${20 + i * 30}%`,
                  right: `${10 + i * 15}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.7,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ============================================
            RIGHT/LEFT: CONTENT
        ============================================ */}
        <div
          className={cn(
            "flex-1 text-center",
            isEven ? "md:text-left" : "md:text-right",
          )}
        >
          {/* Step Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 }}
            className={cn(
              "inline-block",
              "px-3 py-1 mb-3",
              "rounded-full",
              "text-xs font-bold uppercase tracking-wider",
            )}
            style={{
              backgroundColor: `${step.color}15`,
              color: step.color,
            }}
          >
            Step {index + 1}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            {step.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.4 }}
            className="text-base text-gray-600 dark:text-gray-400 mb-5 max-w-md mx-auto md:mx-0 leading-relaxed"
          >
            {step.description}
          </motion.p>

          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5 }}
            className={cn(
              "flex flex-wrap gap-2",
              "justify-center",
              isEven ? "md:justify-start" : "md:justify-end",
            )}
          >
            {step.features.map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.6 + i * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "px-3 py-1.5 rounded-full",
                  "text-xs font-semibold",
                  "bg-gray-100 dark:bg-slate-800",
                  "text-gray-700 dark:text-gray-300",
                  "border border-gray-200 dark:border-slate-700",
                  "transition-all duration-200",
                )}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
                {feature}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ============================================
          CONNECTOR LINE (Only if not last step)
      ============================================ */}
      {!isLast && (
        <div className="relative h-16 md:h-20 flex items-center justify-center my-4">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15 + 0.6,
            }}
            className="w-1 h-full origin-top rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${step.color}, ${step.nextColor})`,
            }}
          />

          {/* Animated dots on line */}
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: step.color }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
