"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import TrackerCard from "./TrackerCard.jsx";

export default function KanbanColumn({ status, config, items, index }) {
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "flex flex-col",
        "bg-gray-50 dark:bg-slate-900/50",
        "rounded-2xl",
        "min-h-[400px]",
        "border border-gray-100 dark:border-slate-800",
      )}
    >
      {/* Column Header */}
      <div
        className={cn(
          "p-4 border-b border-gray-200 dark:border-slate-700",
          config.headerBg,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                config.iconBg,
              )}
            >
              <Icon size={14} className={config.iconColor} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {config.label}
              </h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {config.description}
              </p>
            </div>
          </div>

          {/* Count Badge */}
          <div
            className={cn(
              "min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center",
              "text-xs font-bold",
              config.countBg,
            )}
          >
            {items.length}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[600px]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-2">
              <Icon size={20} className="text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 px-4">
              No {config.label.toLowerCase()} applications yet
            </p>
          </div>
        ) : (
          items.map((item, i) => (
            <TrackerCard
              key={item.id}
              item={item}
              statusColor={config.iconColor}
              index={i}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
