"use client";

import { Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import { getDeadlineStatus } from "../../lib/utils.js";

const STATUS_VARIANTS = {
  expired: "default",
  urgent: "danger",
  soon: "warning",
  active: "success",
};

const STATUS_ICONS = {
  expired: AlertCircle,
  urgent: AlertCircle,
  soon: Clock,
  active: CheckCircle2,
};

export default function DeadlineBadge({
  deadline,
  size = "md",
  showIcon = true,
}) {
  const status = getDeadlineStatus(deadline);
  const variant = STATUS_VARIANTS[status.status] || "default";
  const Icon = showIcon ? STATUS_ICONS[status.status] : null;

  return (
    <Badge
      variant={variant}
      size={size}
      icon={Icon}
      pulse={status.status === "urgent"}
    >
      {status.label}
    </Badge>
  );
}
