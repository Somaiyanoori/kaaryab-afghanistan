export const APP_NAME = "KaarYab Afghanistan";
export const APP_TAGLINE = "Opportunity Finder Platform";
export const APP_DESCRIPTION =
  "Discover jobs, internships, scholarships, remote work, and skill-building opportunities across Afghanistan.";
export const APP_URL = "https://kaaryab.af";
export const APP_EMAIL = "hello@kaaryab.af";
export const DEMO_NOTE =
  "This platform uses demo data for educational purposes only";

// NAVIGATION LINKS
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "CV Builder", href: "/cv-builder" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// CATEGORY CONSTANTS
export const CATEGORY_LIST = [
  "Job",
  "Internship",
  "Scholarship",
  "Online Course",
  "Remote Work",
  "Training Program",
  "Volunteer Work",
];

// TYPE CONSTANTS
export const TYPE_LIST = ["Remote", "On-site", "Hybrid"];

// FILTER OPTIONS
export const DEADLINE_FILTERS = [
  { label: "Any Deadline", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Next 3 Months", value: "quarter" },
];

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Deadline (Soonest)", value: "deadline_asc" },
  { label: "Most Viewed", value: "views" },
  { label: "Most Saved", value: "saves" },
];

export const PER_PAGE_OPTIONS = [12, 24, 48];

// GENDER OPTIONS
export const GENDER_OPTIONS = [
  { label: "Any", value: "Any" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

// LANGUAGE OPTIONS
export const LANGUAGE_OPTIONS = [
  { label: "Any Language", value: "Any" },
  { label: "Dari (دری)", value: "Dari" },
  { label: "Pashto (پښتو)", value: "Pashto" },
  { label: "English", value: "English" },
];

// CV TEMPLATES
export const CV_TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    color: "blue",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout",
    color: "gray",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design",
    color: "yellow",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Bold and formal layout",
    color: "navy",
  },
];

// STORAGE KEYS
export const STORAGE_KEYS = {
  SAVED: "kaaryab_saved",
  OPPORTUNITIES: "kaaryab_opportunities",
  CV: "kaaryab_cv",
  THEME: "kaaryab_theme",
  LANGUAGE: "kaaryab_lang",
};

// PLATFORM STATISTICS
export const PLATFORM_STATS = [
  { label: "Opportunities Listed", value: "500+", icon: "Briefcase" },
  { label: "Partner Organizations", value: "30+", icon: "Building2" },
  { label: "Provinces Covered", value: "15+", icon: "MapPin" },
  { label: "Always Free", value: "100%", icon: "Heart" },
];
