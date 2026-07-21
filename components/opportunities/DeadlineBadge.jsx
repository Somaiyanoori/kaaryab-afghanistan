"use client";

import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { getDeadlineStatus, cn } from "../../lib/utils.js";

export default function DeadlineBadge({
  deadline,
  size = "default",
  showIcon = true,
}) {
  const status = getDeadlineStatus(deadline);

  // Choose icon based on status
  const Icon =
    status.status === "expired"
      ? AlertCircle
      : status.status === "urgent"
        ? AlertCircle
        : status.status === "soon"
          ? Clock
          : CheckCircle2;

  const sizeClasses = {
    small: "px-2 py-0.5 text-[10px]",
    default: "px-2.5 py-1 text-xs",
    large: "px-3 py-1.5 text-sm",
  };

  const iconSize = {
    small: 10,
    default: 12,
    large: 14,
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-semibold rounded-full",
        "transition-colors duration-200",
        status.badgeClass,
        sizeClasses[size],
      )}
    >
      {showIcon && (
        <Icon
          size={iconSize[size]}
          className={status.status === "urgent" ? "animate-pulse" : ""}
        />
      )}
      <span>{status.label}</span>
    </div>
  );
}
