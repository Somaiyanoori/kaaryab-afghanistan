"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  MoreVertical,
  Trash2,
  Edit3,
} from "lucide-react";
import { useState } from "react";
import { formatDate, getCategoryColors, cn } from "../../lib/utils.js";
import { removeFromTracker, updateTrackerStatus } from "../../lib/db.js";
import { useTrackerStore } from "../../store/index.js";
import toast from "react-hot-toast";

export default function TrackerCard({ item, statusColor, index }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const removeItemFromStore = useTrackerStore((state) => state.removeItem);
  const opportunity = item.opportunity_data;
  const colors = getCategoryColors(opportunity.category);

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Remove this from your tracker?")) return;

    try {
      await removeFromTracker(item.id);
      removeItemFromStore(item.id);
      toast.success("Removed from tracker");
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "group relative",
        "bg-white dark:bg-slate-800",
        "border border-gray-100 dark:border-slate-700",
        "rounded-xl overflow-hidden",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200",
        "cursor-grab active:cursor-grabbing",
      )}
    >
      {/* Category color bar */}
      <div
        className="h-1 w-full"
        style={{ background: colors.solidGradient }}
      />

      <div className="p-3">
        {/* Header: Avatar + Menu */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0"
            style={{ background: colors.solidGradient }}
          >
            {opportunity.organization?.charAt(0) || "?"}
          </div>

          <button
            onClick={handleRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-400 hover:text-red-500 flex items-center justify-center"
          >
            <Trash2 size={12} />
          </button>
        </div>

        {/* Content */}
        <Link
          href={`/opportunities/${opportunity.slug || opportunity.id}`}
          className="block"
        >
          {/* Title */}
          <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
            {opportunity.title}
          </h4>

          {/* Organization */}
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
            {opportunity.organization}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-0.5">
              <MapPin size={9} />
              <span className="truncate">{opportunity.location}</span>
            </div>
            {opportunity.deadline && (
              <>
                <span>·</span>
                <div className="flex items-center gap-0.5">
                  <Calendar size={9} />
                  <span>{formatDate(opportunity.deadline)}</span>
                </div>
              </>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
