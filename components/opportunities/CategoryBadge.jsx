"use client";

import { getCategoryColors, cn } from "../../lib/utils.js";

export default function CategoryBadge({ category, size = "default" }) {
  const colors = getCategoryColors(category);

  const sizeClasses = {
    small: "px-2 py-0.5 text-[10px]",
    default: "px-2.5 py-1 text-xs",
    large: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-semibold rounded-full",
        "border",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
      {category}
    </span>
  );
}
