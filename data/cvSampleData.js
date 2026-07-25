// ============================================
// SAMPLE CV DATA
// ============================================
export const sampleCVData = {
  personal: {
    fullName: "Ahmad Karimi",
    jobTitle: "Frontend Developer",
    email: "ahmad.karimi@example.com",
    phone: "+93 700 000 000",
    city: "Kabul, Afghanistan",
    website: "https://ahmadkarimi.dev",
    linkedin: "https://linkedin.com/in/ahmadkarimi",
    summary:
      "Passionate frontend developer with 2+ years of experience building modern web applications. Skilled in React, Next.js, and TypeScript. Committed to creating beautiful, accessible user experiences.",
  },
  experiences: [
    {
      id: "exp_1",
      position: "Frontend Developer",
      company: "Kabul Tech Community",
      location: "Kabul, Afghanistan",
      startDate: "2024-01",
      endDate: "",
      current: true,
      description:
        "Building modern web applications using React and Next.js. Collaborating with designers to implement responsive UI. Mentoring junior developers.",
    },
    {
      id: "exp_2",
      position: "Junior Web Developer",
      company: "Digital Agency Kabul",
      location: "Kabul, Afghanistan",
      startDate: "2022-06",
      endDate: "2023-12",
      current: false,
      description:
        "Developed responsive websites for local businesses. Worked with HTML, CSS, JavaScript, and WordPress. Improved website performance by 40%.",
    },
  ],
  education: [
    {
      id: "edu_1",
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "Kabul University",
      location: "Kabul, Afghanistan",
      startDate: "2019-09",
      endDate: "2023-06",
      gpa: "3.8",
      description:
        "Focused on web development, algorithms, and software engineering.",
    },
  ],
  skills: [
    { id: "skill_1", name: "React", level: "Expert" },
    { id: "skill_2", name: "Next.js", level: "Advanced" },
    { id: "skill_3", name: "JavaScript", level: "Expert" },
    { id: "skill_4", name: "TypeScript", level: "Advanced" },
    { id: "skill_5", name: "Tailwind CSS", level: "Expert" },
    { id: "skill_6", name: "Node.js", level: "Intermediate" },
    { id: "skill_7", name: "Git", level: "Advanced" },
    { id: "skill_8", name: "HTML/CSS", level: "Expert" },
  ],
  languages: [
    { id: "lang_1", name: "Dari", proficiency: "Native" },
    { id: "lang_2", name: "Pashto", proficiency: "Fluent" },
    { id: "lang_3", name: "English", proficiency: "Fluent" },
    { id: "lang_4", name: "Arabic", proficiency: "Basic" },
  ],
  projects: [
    {
      id: "proj_1",
      name: "KaarYab Platform",
      description:
        "Opportunity finder platform for Afghan youth. Built with Next.js, Tailwind CSS, and Zustand.",
      link: "https://kaaryab.af",
      technologies: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      id: "proj_2",
      name: "E-commerce Website",
      description:
        "Full-featured e-commerce site for a local business with payment integration.",
      link: "",
      technologies: ["React", "Node.js", "MongoDB"],
    },
  ],
  certifications: [
    {
      id: "cert_1",
      name: "React Advanced Certification",
      issuer: "Meta",
      date: "2024-01",
      link: "",
    },
    {
      id: "cert_2",
      name: "Full Stack Web Development",
      issuer: "Coursera",
      date: "2023-08",
      link: "",
    },
  ],
};

// ============================================
// CV TEMPLATES
// ============================================
export const cvTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean two-column layout with blue accents",
    color: "#3B82F6",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional single-column, professional",
    color: "#1F2937",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with yellow accents",
    color: "#EAB308",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Bold design with dark sidebar",
    color: "#0F172A",
  },
];
