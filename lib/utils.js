import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, isPast, parseISO, format } from "date-fns";
import { STORAGE_KEYS } from "./constants.js";

// TAILWIND CLASS MERGER
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// DEADLINE UTILITIES
export function getDeadlineStatus(deadline) {
  if (!deadline)
    return { status: "unknown", label: "No deadline", daysLeft: null };

  const deadlineDate = parseISO(deadline);
  const today = new Date();

  if (isPast(deadlineDate)) {
    return {
      status: "expired",
      label: "Expired",
      daysLeft: 0,
      colorClass: "text-gray-500",
      bgClass: "bg-gray-100 dark:bg-gray-800",
      badgeClass:
        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    };
  }

  const daysLeft = differenceInDays(deadlineDate, today);

  if (daysLeft <= 7) {
    return {
      status: "urgent",
      label: `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`,
      daysLeft,
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      badgeClass:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
  }

  if (daysLeft <= 30) {
    return {
      status: "soon",
      label: `${daysLeft} days left`,
      daysLeft,
      colorClass: "text-amber-600 dark:text-amber-400",
      bgClass: "bg-amber-50 dark:bg-amber-900/20",
      badgeClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    };
  }

  return {
    status: "active",
    label: format(deadlineDate, "MMM d, yyyy"),
    daysLeft,
    colorClass: "text-green-600 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-900/20",
    badgeClass:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };
}

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "MMM d, yyyy");
  } catch {
    return "Invalid date";
  }
}

export function formatRelativeDate(dateString) {
  if (!dateString) return "";
  try {
    const date = parseISO(dateString);
    const daysAgo = differenceInDays(new Date(), date);
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return format(date, "MMM d, yyyy");
  } catch {
    return "";
  }
}

// STRING UTILITIES
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// FILTER UTILITIES
export function filterOpportunities(opportunities, filters) {
  let result = [...opportunities];

  if (filters.search && filters.search.trim()) {
    const query = filters.search.toLowerCase().trim();
    result = result.filter(
      (opp) =>
        opp.title?.toLowerCase().includes(query) ||
        opp.organization?.toLowerCase().includes(query) ||
        opp.description?.toLowerCase().includes(query) ||
        opp.shortDesc?.toLowerCase().includes(query) ||
        opp.location?.toLowerCase().includes(query) ||
        opp.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  if (filters.category && filters.category !== "All") {
    result = result.filter((opp) => opp.category === filters.category);
  }

  if (filters.location && filters.location !== "All") {
    result = result.filter((opp) => opp.location === filters.location);
  }

  if (filters.type && filters.type !== "All") {
    result = result.filter((opp) => opp.type === filters.type);
  }

  if (filters.deadline && filters.deadline !== "all") {
    const today = new Date();
    result = result.filter((opp) => {
      try {
        const deadlineDate = parseISO(opp.deadline);
        const daysLeft = differenceInDays(deadlineDate, today);
        if (filters.deadline === "week") return daysLeft >= 0 && daysLeft <= 7;
        if (filters.deadline === "month")
          return daysLeft >= 0 && daysLeft <= 30;
        if (filters.deadline === "quarter")
          return daysLeft >= 0 && daysLeft <= 90;
      } catch {
        return true;
      }
      return true;
    });
  }

  // Hide expired by default
  result = result.filter((opp) => {
    try {
      return !isPast(parseISO(opp.deadline));
    } catch {
      return true;
    }
  });

  if (filters.sort) {
    result.sort((a, b) => {
      switch (filters.sort) {
        case "newest":
          return new Date(b.postedDate) - new Date(a.postedDate);
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "deadline_asc":
          return new Date(a.deadline) - new Date(b.deadline);
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "saves":
          return (b.saves || 0) - (a.saves || 0);
        default:
          return 0;
      }
    });
  }

  return result;
}

// STATS CALCULATOR
export function calculateStats(opportunities) {
  const today = new Date();
  const active = opportunities.filter((o) => {
    try {
      return !isPast(parseISO(o.deadline));
    } catch {
      return true;
    }
  });

  return {
    total: opportunities.length,
    active: active.length,
    jobs: opportunities.filter((o) => o.category === "Job").length,
    internships: opportunities.filter((o) => o.category === "Internship")
      .length,
    scholarships: opportunities.filter((o) => o.category === "Scholarship")
      .length,
    onlineCourses: opportunities.filter((o) => o.category === "Online Course")
      .length,
    remoteWork: opportunities.filter((o) => o.category === "Remote Work")
      .length,
    training: opportunities.filter((o) => o.category === "Training Program")
      .length,
    volunteer: opportunities.filter((o) => o.category === "Volunteer Work")
      .length,
    remote: opportunities.filter((o) => o.type === "Remote").length,
    expiringSoon: opportunities.filter((o) => {
      try {
        const days = differenceInDays(parseISO(o.deadline), today);
        return days >= 0 && days <= 7;
      } catch {
        return false;
      }
    }).length,
    featured: opportunities.filter((o) => o.featured).length,
  };
}

// ============================================
// CATEGORY COLOR HELPERS (with real hex values)
// ============================================
export function getCategoryColors(category) {
  const colors = {
    Job: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
      dot: "bg-blue-500",
      // Real hex gradient for logo backgrounds
      solidGradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
      hex: "#2563EB",
    },
    Internship: {
      bg: "bg-teal-100 dark:bg-teal-900/30",
      text: "text-teal-700 dark:text-teal-300",
      border: "border-teal-200 dark:border-teal-800",
      dot: "bg-teal-500",
      solidGradient: "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
      hex: "#0D9488",
    },
    Scholarship: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
      dot: "bg-purple-500",
      solidGradient: "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)",
      hex: "#9333EA",
    },
    "Online Course": {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-800",
      dot: "bg-indigo-500",
      solidGradient: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
      hex: "#4F46E5",
    },
    "Remote Work": {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
      dot: "bg-green-500",
      solidGradient: "linear-gradient(135deg, #22C55E 0%, #15803D 100%)",
      hex: "#16A34A",
    },
    "Training Program": {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800",
      dot: "bg-amber-500",
      solidGradient: "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
      hex: "#D97706",
    },
    "Volunteer Work": {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-700 dark:text-pink-300",
      border: "border-pink-200 dark:border-pink-800",
      dot: "bg-pink-500",
      solidGradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
      hex: "#DB2777",
    },
  };
  return colors[category] || colors["Job"];
}
// LOCAL STORAGE UTILITIES
export function getFromStorage(key, defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function removeFromStorage(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove from localStorage:", error);
  }
}

// PAGINATION UTILITY
export function paginateData(data, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    data: data.slice(start, end),
    total: data.length,
    totalPages: Math.ceil(data.length / perPage),
    currentPage: page,
    hasNext: end < data.length,
    hasPrev: page > 1,
  };
}
