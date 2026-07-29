"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../ui/Button.jsx";
import { cn } from "../../lib/utils.js";

/**
 * SuccessState — Reusable success UI for confirmations
 *
 * USAGE:
 *
 * // Basic
 * <SuccessState title="Success!" />
 *
 * // With description
 * <SuccessState
 *   title="Message Sent!"
 *   description="We'll get back to you within 24 hours"
 * />
 *
 * // With action button
 * <SuccessState
 *   title="Opportunity Submitted!"
 *   description="Your opportunity is now live"
 *   actionLabel="View Opportunity"
 *   actionHref="/opportunities/123"
 * />
 *
 * // With secondary action
 * <SuccessState
 *   title="Application Sent!"
 *   actionLabel="View Details"
 *   actionHref="/dashboard"
 *   secondaryLabel="Add Another"
 *   secondaryHref="/add-opportunity"
 * />
 *
 * // Full page mode
 * <SuccessState fullPage title="Payment Complete!" />
 */
export default function SuccessState({
  icon: Icon = CheckCircle2,
  title = "Success!",
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  secondaryHref,
  onSecondary,
  fullPage = false,
  className,
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center",
        "py-16 px-4",
        className,
      )}
    >
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          delay: 0.1,
        }}
        className={cn(
          "w-24 h-24 rounded-full mb-6",
          "bg-gradient-to-br from-green-400 to-green-600",
          "flex items-center justify-center",
          "shadow-2xl",
          "relative",
        )}
      >
        <Icon size={48} className="text-white" strokeWidth={2.5} />

        {/* Ripple effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full bg-green-500"
        />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-md"
        >
          {description}
        </motion.p>
      )}

      {/* Actions */}
      {(actionLabel || secondaryLabel) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {actionLabel && (actionHref || onAction) && (
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              href={actionHref}
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}

          {secondaryLabel && (secondaryHref || onSecondary) && (
            <Button
              variant="outline"
              size="md"
              href={secondaryHref}
              onClick={onSecondary}
            >
              {secondaryLabel}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-20">
        {content}
      </div>
    );
  }

  return content;
}
