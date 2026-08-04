import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// LOAD ENVIRONMENT VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

dotenv.config({ path: join(rootDir, ".env.local") });

// SUPABASE CLIENT
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

console.log("🔗 Connecting to:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// MOCK DATA (paste your opportunities here)
// ============================================
const opportunities = [
  {
    slug: "frontend-developer-intern-kabul-tech",
    title: "Frontend Developer Intern",
    organization: "Kabul Tech Community",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: "2026-08-15",
    postedDate: "2025-01-10",
    shortDesc:
      "A beginner-friendly internship for students who know React and Next.js basics.",
    description:
      "This internship is designed for Afghan youth who want to gain real-world experience in frontend development. You will work on real projects, learn from senior developers, and build your portfolio.",
    requirements: [
      "Basic knowledge of React",
      "Understanding of HTML and CSS",
      "Familiarity with GitHub",
      "Good communication skills",
      "Ability to work 4 hours per day",
    ],
    applyLink: "https://example.com/apply/frontend-intern",
    contactEmail: "hr@kabultech.af",
    tags: ["React", "Next.js", "Internship", "Remote"],
    featured: true,
    urgent: false,
    verified: true,
    salary: null,
    duration: "3 months",
    seats: 5,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "women-in-tech-scholarship-2026",
    title: "Women in Tech Scholarship 2026",
    organization: "Global Learning Foundation",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2026-07-10",
    postedDate: "2025-01-08",
    shortDesc:
      "Full scholarship for Afghan women who want to study technology online.",
    description:
      "The Women in Tech Scholarship is a fully-funded program for Afghan women who want to build a career in technology. Scholars receive access to online courses, mentorship, and a monthly stipend.",
    requirements: [
      "Female applicants only",
      "Basic English reading ability",
      "Motivation letter",
      "Internet access",
      "Age 18-35",
    ],
    applyLink: "https://example.com/apply/women-tech",
    contactEmail: "scholarships@glf.org",
    tags: ["Scholarship", "Women", "Online", "Technology"],
    featured: true,
    urgent: true,
    verified: true,
    salary: "$200/month stipend",
    duration: "12 months",
    seats: 20,
    gender: "Female",
    language: "English",
  },
  {
    slug: "graphic-designer-job-herat",
    title: "Graphic Designer",
    organization: "Herat Creative Studio",
    category: "Job",
    location: "Herat",
    type: "On-site",
    deadline: "2026-09-01",
    postedDate: "2025-01-12",
    shortDesc:
      "Looking for a talented graphic designer to join our creative team in Herat.",
    description:
      "Herat Creative Studio is looking for a skilled graphic designer to create stunning visuals for local and international clients.",
    requirements: [
      "2+ years of graphic design experience",
      "Proficiency in Adobe Photoshop and Illustrator",
      "Strong portfolio",
      "Team player",
      "Attention to detail",
    ],
    applyLink: "https://example.com/apply/graphic-designer",
    contactEmail: "jobs@heratcreative.af",
    tags: ["Design", "Graphic Design", "Herat", "Creative"],
    featured: false,
    urgent: false,
    verified: true,
    salary: "15,000-20,000 AFN/month",
    duration: "Full-time",
    seats: 1,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "python-programming-online-course",
    title: "Python Programming Masterclass",
    organization: "Afghan Coders Academy",
    category: "Online Course",
    location: "Online",
    type: "Remote",
    deadline: "2026-10-30",
    postedDate: "2025-01-05",
    shortDesc:
      "Learn Python from scratch to advanced level with Afghan instructors in Dari.",
    description:
      "This comprehensive Python course is taught entirely in Dari by experienced Afghan developers. Perfect for beginners with no prior coding experience.",
    requirements: [
      "No prior coding experience needed",
      "Computer or smartphone",
      "Internet connection",
      "Willingness to practice daily",
    ],
    applyLink: "https://example.com/enroll/python",
    contactEmail: "courses@afghancoders.af",
    tags: ["Python", "Programming", "Online", "Dari", "Beginner"],
    featured: true,
    urgent: false,
    verified: true,
    salary: null,
    duration: "4 months",
    seats: 100,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "data-entry-remote-work",
    title: "Remote Data Entry Specialist",
    organization: "International Data Corp",
    category: "Remote Work",
    location: "Online",
    type: "Remote",
    deadline: "2026-08-20",
    postedDate: "2025-01-14",
    shortDesc:
      "Work from home as a data entry specialist. No experience required.",
    description:
      "We are looking for detail-oriented individuals to join our remote data entry team. Flexible hours, perfect for students.",
    requirements: [
      "Basic computer skills",
      "Good typing speed",
      "Microsoft Excel basics",
      "Internet access",
      "4-6 hours availability per day",
    ],
    applyLink: "https://example.com/apply/data-entry",
    contactEmail: "remote@intldatacorp.com",
    tags: ["Remote", "Data Entry", "Work From Home", "No Experience"],
    featured: false,
    urgent: true,
    verified: true,
    salary: "$300-500/month",
    duration: "Ongoing",
    seats: 10,
    gender: "Any",
    language: "English",
  },
  {
    slug: "digital-marketing-training-kabul",
    title: "Digital Marketing Training Program",
    organization: "Kabul Business Institute",
    category: "Training Program",
    location: "Kabul",
    type: "Hybrid",
    deadline: "2026-07-25",
    postedDate: "2025-01-11",
    shortDesc:
      "Free 3-month digital marketing training for young Afghan entrepreneurs.",
    description:
      "Free digital marketing training including SEO, social media, Google Ads, and content creation for young Afghan entrepreneurs.",
    requirements: [
      "Age 20-35",
      "Basic smartphone skills",
      "Business idea preferred",
      "Full attendance commitment",
    ],
    applyLink: "https://example.com/apply/digital-marketing",
    contactEmail: "training@kbi.af",
    tags: ["Marketing", "Digital", "Training", "Free"],
    featured: false,
    urgent: true,
    verified: true,
    salary: null,
    duration: "3 months",
    seats: 30,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "community-health-volunteer-balkh",
    title: "Community Health Volunteer",
    organization: "Afghan Health Foundation",
    category: "Volunteer Work",
    location: "Mazar-i-Sharif",
    type: "On-site",
    deadline: "2026-09-15",
    postedDate: "2025-01-09",
    shortDesc:
      "Volunteer to help deliver basic health education in Balkh communities.",
    description:
      "Volunteers will assist in delivering health awareness sessions and supporting local health workers in Balkh province.",
    requirements: [
      "Living near Mazar-i-Sharif",
      "Interest in public health",
      "3 days per week availability",
      "Basic Dari or Pashto literacy",
    ],
    applyLink: "https://example.com/volunteer/health",
    contactEmail: "volunteers@ahf.af",
    tags: ["Volunteer", "Health", "Community", "Balkh"],
    featured: false,
    urgent: false,
    verified: true,
    salary: null,
    duration: "6 months",
    seats: 20,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "software-engineer-job-kabul",
    title: "Junior Software Engineer",
    organization: "AfghanTech Solutions",
    category: "Job",
    location: "Kabul",
    type: "Hybrid",
    deadline: "2026-08-30",
    postedDate: "2025-01-13",
    shortDesc:
      "Join our growing tech team as a junior software engineer in Kabul.",
    description:
      "AfghanTech Solutions is looking for passionate junior software engineers to work on web and mobile applications serving thousands of Afghan users.",
    requirements: [
      "CS degree or equivalent",
      "JavaScript, Python, or PHP knowledge",
      "Database understanding",
      "Problem-solving mindset",
      "Team player",
    ],
    applyLink: "https://example.com/apply/software-engineer",
    contactEmail: "careers@afghantechsolutions.af",
    tags: ["Software", "Engineering", "JavaScript", "Kabul"],
    featured: true,
    urgent: false,
    verified: true,
    salary: "$800-1200/month",
    duration: "Full-time",
    seats: 3,
    gender: "Any",
    language: "English",
  },
  {
    slug: "english-language-scholarship-online",
    title: "English Language Improvement Scholarship",
    organization: "US Embassy Kabul",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2026-07-05",
    postedDate: "2025-01-06",
    shortDesc:
      "Free online English language program for Afghan youth aged 18-30.",
    description:
      "Free English language improvement program for young Afghans with internationally recognized certificate upon completion.",
    requirements: [
      "Age 18-30",
      "Basic English ability",
      "Internet access",
      "Motivation statement",
      "Afghan national",
    ],
    applyLink: "https://example.com/apply/english-scholarship",
    contactEmail: "programs@usembassy.af",
    tags: ["English", "Scholarship", "Online", "Language", "Free"],
    featured: true,
    urgent: true,
    verified: true,
    salary: null,
    duration: "6 months",
    seats: 500,
    gender: "Any",
    language: "English",
  },
  {
    slug: "content-writer-remote-dari",
    title: "Dari Content Writer (Remote)",
    organization: "Afghan Media Network",
    category: "Remote Work",
    location: "Online",
    type: "Remote",
    deadline: "2026-09-20",
    postedDate: "2025-01-15",
    shortDesc: "Write articles and social media content in Dari from anywhere.",
    description:
      "Afghan Media Network is looking for talented Dari-language writers to create engaging content about technology, health, education, and business.",
    requirements: [
      "Excellent written Dari",
      "Interest in technology or current affairs",
      "2-3 articles per week",
      "Writing samples portfolio",
    ],
    applyLink: "https://example.com/apply/dari-writer",
    contactEmail: "editorial@afghanmedia.af",
    tags: ["Writing", "Dari", "Remote", "Content", "Media"],
    featured: false,
    urgent: false,
    verified: true,
    salary: "$5-15 per article",
    duration: "Ongoing",
    seats: 15,
    gender: "Any",
    language: "Dari",
  },
  {
    slug: "web-design-internship-kandahar",
    title: "Web Design Internship",
    organization: "Kandahar Digital Agency",
    category: "Internship",
    location: "Kandahar",
    type: "On-site",
    deadline: "2026-08-01",
    postedDate: "2025-01-07",
    shortDesc:
      "Learn web design and UI/UX in a professional agency environment.",
    description:
      "Hands-on web design internship working on real client projects from day one with guidance from experienced designers.",
    requirements: [
      "Interest in visual design",
      "Basic HTML/CSS",
      "Figma familiarity",
      "Portfolio or design samples",
      "Full-time availability",
    ],
    applyLink: "https://example.com/apply/web-design-intern",
    contactEmail: "hr@kandahardigital.af",
    tags: ["Design", "Web", "UI/UX", "Internship", "Kandahar"],
    featured: false,
    urgent: false,
    verified: true,
    salary: "5,000 AFN/month",
    duration: "4 months",
    seats: 2,
    gender: "Any",
    language: "Pashto",
  },
  {
    slug: "accounting-job-nangarhar",
    title: "Junior Accountant",
    organization: "Nangarhar Business Group",
    category: "Job",
    location: "Jalalabad",
    type: "On-site",
    deadline: "2026-09-10",
    postedDate: "2025-01-10",
    shortDesc: "Join our finance team as a junior accountant in Jalalabad.",
    description:
      "Seeking a detail-oriented junior accountant for bookkeeping, financial reporting, and budget tracking.",
    requirements: [
      "Accounting or Finance degree",
      "QuickBooks knowledge",
      "Strong math skills",
      "Attention to detail",
      "1+ year experience preferred",
    ],
    applyLink: "https://example.com/apply/accountant",
    contactEmail: "jobs@nangarhargroup.af",
    tags: ["Accounting", "Finance", "Jalalabad", "Business"],
    featured: false,
    urgent: false,
    verified: true,
    salary: "18,000-22,000 AFN/month",
    duration: "Full-time",
    seats: 1,
    gender: "Any",
    language: "Pashto",
  },
];

// SEED FUNCTION
async function seed() {
  console.log("\n Starting database seed...\n");
  console.log(` Total opportunities to insert: ${opportunities.length}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const opp of opportunities) {
    try {
      const { error } = await supabase.from("opportunities").insert({
        user_id: "seed_admin",
        title: opp.title,
        organization: opp.organization,
        category: opp.category,
        location: opp.location,
        type: opp.type,
        deadline: opp.deadline,
        short_desc: opp.shortDesc,
        description: opp.description,
        requirements: opp.requirements,
        apply_link: opp.applyLink,
        tags: opp.tags,
        contact_email: opp.contactEmail,
        salary: opp.salary,
        duration: opp.duration,
        seats: opp.seats,
        gender: opp.gender,
        language: opp.language,
        featured: opp.featured,
        urgent: opp.urgent,
        verified: opp.verified,
        slug: opp.slug,
        posted_date: opp.postedDate,
      });

      if (error) {
        console.log(` Failed: ${opp.title}`);
        console.log(`   Error: ${error.message}`);
        failCount++;
      } else {
        console.log(` Added: ${opp.title}`);
        successCount++;
      }
    } catch (err) {
      console.log(` Error inserting ${opp.title}:`, err.message);
      failCount++;
    }
  }

  console.log("\n============================================");
  console.log(` Seeding complete!`);
  console.log(` Success: ${successCount}`);
  console.log(` Failed: ${failCount}`);
  console.log("============================================\n");
}

// Run the seed
seed().catch((error) => {
  console.error(" Seed failed:", error);
  process.exit(1);
});
