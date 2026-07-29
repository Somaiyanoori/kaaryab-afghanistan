"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Eye,
  Bookmark,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import { isPast, parseISO } from "date-fns";
import CountdownTimer from "./CountdownTimer.jsx";
import SaveButton from "../opportunities/SaveButton.jsx";
import ShareButtons from "./ShareButtons.jsx";
import { cn } from "../../lib/utils.js";
import Button from "../ui/Button.jsx";
export default function ApplyCard({ opportunity }) {
  const isExpired = (() => {
    try {
      return isPast(parseISO(opportunity.deadline));
    } catch {
      return false;
    }
  })();

  return (
    <div className="lg:sticky lg:top-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "bg-white dark:bg-slate-800",
          "border border-gray-100 dark:border-slate-700",
          "rounded-2xl",
          "p-6",
          "shadow-xl",
          "space-y-5",
        )}
      >
        {/* ============================================
            Countdown Timer
        ============================================ */}
        <CountdownTimer deadline={opportunity.deadline} />

        {/* ============================================
            Apply Button
        ============================================ */}
        {isExpired ? (
          <div
            className={cn(
              "w-full py-4 rounded-xl",
              "bg-gray-100 dark:bg-slate-700",
              "text-center",
            )}
          >
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Applications Closed
            </p>
          </div>
        ) : (
          <Button
            href={opportunity.applyLink}
            target="_blank"
            variant="primary"
            size="lg"
            icon={ExternalLink}
            iconPosition="right"
            fullWidth
          >
            Apply Now
          </Button>
        )}

        {/* ============================================
            Info Note
        ============================================ */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          {isExpired
            ? "The application deadline has passed"
            : `You'll be redirected to ${opportunity.organization}'s website`}
        </p>

        {/* ============================================
            Action Buttons Row
        ============================================ */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-slate-700">
          <SaveButton
            opportunity={opportunity}
            size="default"
            variant="outline"
          />
          <ShareButtons opportunity={opportunity} />

          {/* Stats */}
          <div className="flex-1 flex items-center justify-end gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{opportunity.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark size={12} />
              <span>{opportunity.saves || 0}</span>
            </div>
          </div>
        </div>

        {/* ============================================
            Contact Info (if available)
        ============================================ */}
        {(opportunity.contactEmail || opportunity.contactPhone) && (
          <div
            className={cn(
              "pt-4 border-t border-gray-100 dark:border-slate-700",
              "space-y-2",
            )}
          >
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Contact Info
            </p>

            {opportunity.contactEmail && (
              <a
                href={`mailto:${opportunity.contactEmail}`}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-gray-900 transition-colors">
                  <Mail size={14} />
                </div>
                <span className="truncate">{opportunity.contactEmail}</span>
              </a>
            )}

            {opportunity.contactPhone && (
              <a
                href={`tel:${opportunity.contactPhone}`}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-gray-900 transition-colors">
                  <Phone size={14} />
                </div>
                <span>{opportunity.contactPhone}</span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
