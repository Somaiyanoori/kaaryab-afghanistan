"use client";

import { cn } from "../../lib/utils.js";

export default function OpportunityCardSkeleton() {
  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800",
        "border border-gray-100 dark:border-slate-700",
        "rounded-2xl",
        "p-5",
        "h-full",
      )}
    >
      {/* Header: Logo + Category */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl skeleton" />
        <div className="flex-1">
          <div className="w-20 h-5 rounded-full skeleton" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-2 space-y-2">
        <div className="w-full h-5 rounded skeleton" />
        <div className="w-3/4 h-5 rounded skeleton" />
      </div>

      {/* Organization */}
      <div className="w-2/3 h-3 rounded skeleton mb-3" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 rounded skeleton" />
        <div className="w-5/6 h-3 rounded skeleton" />
      </div>

      {/* Meta */}
      <div className="flex gap-2 mb-4">
        <div className="w-16 h-5 rounded-md skeleton" />
        <div className="w-14 h-5 rounded-md skeleton" />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between">
        <div className="w-24 h-6 rounded-full skeleton" />
        <div className="w-8 h-8 rounded-full skeleton" />
      </div>
    </div>
  );
}
