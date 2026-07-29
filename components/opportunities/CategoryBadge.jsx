"use client";

import Badge from "../ui/Badge.jsx";

const CATEGORY_VARIANTS = {
  Job: "info",
  Internship: "teal",
  Scholarship: "purple",
  "Online Course": "info",
  "Remote Work": "success",
  "Training Program": "warning",
  "Volunteer Work": "pink",
};

export default function CategoryBadge({ category, size = "md" }) {
  const variant = CATEGORY_VARIANTS[category] || "default";

  return (
    <Badge variant={variant} size={size} dot>
      {category}
    </Badge>
  );
}
