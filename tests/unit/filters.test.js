import { describe, it, expect } from "vitest";
import { filterOpportunities, calculateStats } from "../../lib/utils.js";

// Sample data for testing
const mockOpportunities = [
  {
    id: "1",
    title: "Frontend Developer",
    organization: "Tech Corp",
    category: "Job",
    location: "Kabul",
    type: "Remote",
    deadline: "2027-12-31",
    shortDesc: "React and Next.js developer needed",
    description: "Great opportunity for developers",
    tags: ["React", "JavaScript"],
    postedDate: "2025-01-01",
    views: 100,
    saves: 20,
  },
  {
    id: "2",
    title: "UX Designer Internship",
    organization: "Design Studio",
    category: "Internship",
    location: "Herat",
    type: "On-site",
    deadline: "2027-06-15",
    shortDesc: "Design internship for students",
    description: "Learn UX design",
    tags: ["Design", "UX"],
    postedDate: "2025-02-01",
    views: 50,
    saves: 10,
  },
  {
    id: "3",
    title: "Data Science Scholarship",
    organization: "University XYZ",
    category: "Scholarship",
    location: "Online",
    type: "Remote",
    deadline: "2027-09-01",
    shortDesc: "Full scholarship for data science",
    description: "Master data science",
    tags: ["Data", "Science"],
    postedDate: "2025-03-01",
    views: 200,
    saves: 50,
  },
];

// ============================================
// SEARCH FILTER TESTS
// ============================================
describe("filterOpportunities - Search", () => {
  it("should return all opportunities when no filters", () => {
    const result = filterOpportunities(mockOpportunities, {});
    expect(result).toHaveLength(3);
  });

  it("should filter by search query in title", () => {
    const result = filterOpportunities(mockOpportunities, {
      search: "Frontend",
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("should filter by search query in organization", () => {
    const result = filterOpportunities(mockOpportunities, {
      search: "Design Studio",
    });
    expect(result).toHaveLength(1);
  });

  it("should filter by search query in tags", () => {
    const result = filterOpportunities(mockOpportunities, { search: "React" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("should be case insensitive", () => {
    const result = filterOpportunities(mockOpportunities, {
      search: "FRONTEND",
    });
    expect(result).toHaveLength(1);
  });

  it("should return empty array when no match", () => {
    const result = filterOpportunities(mockOpportunities, {
      search: "NonExistent",
    });
    expect(result).toHaveLength(0);
  });
});

// ============================================
// CATEGORY FILTER TESTS
// ============================================
describe("filterOpportunities - Category", () => {
  it("should filter by Job category", () => {
    const result = filterOpportunities(mockOpportunities, { category: "Job" });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Job");
  });

  it("should filter by Internship category", () => {
    const result = filterOpportunities(mockOpportunities, {
      category: "Internship",
    });
    expect(result).toHaveLength(1);
  });

  it("should return all when category is 'All'", () => {
    const result = filterOpportunities(mockOpportunities, { category: "All" });
    expect(result).toHaveLength(3);
  });

  it("should return empty for non-existent category", () => {
    const result = filterOpportunities(mockOpportunities, {
      category: "NonExistent",
    });
    expect(result).toHaveLength(0);
  });
});

// ============================================
// LOCATION FILTER TESTS
// ============================================
describe("filterOpportunities - Location", () => {
  it("should filter by Kabul", () => {
    const result = filterOpportunities(mockOpportunities, {
      location: "Kabul",
    });
    expect(result).toHaveLength(1);
  });

  it("should filter by Online", () => {
    const result = filterOpportunities(mockOpportunities, {
      location: "Online",
    });
    expect(result).toHaveLength(1);
  });

  it("should return all when location is 'All'", () => {
    const result = filterOpportunities(mockOpportunities, { location: "All" });
    expect(result).toHaveLength(3);
  });
});

// ============================================
// TYPE FILTER TESTS
// ============================================
describe("filterOpportunities - Type", () => {
  it("should filter by Remote type", () => {
    const result = filterOpportunities(mockOpportunities, { type: "Remote" });
    expect(result).toHaveLength(2);
  });

  it("should filter by On-site type", () => {
    const result = filterOpportunities(mockOpportunities, { type: "On-site" });
    expect(result).toHaveLength(1);
  });
});

// ============================================
// COMBINED FILTERS TESTS
// ============================================
describe("filterOpportunities - Combined", () => {
  it("should combine category and location filters", () => {
    const result = filterOpportunities(mockOpportunities, {
      category: "Job",
      location: "Kabul",
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("should combine search and type filters", () => {
    const result = filterOpportunities(mockOpportunities, {
      search: "Developer",
      type: "Remote",
    });
    expect(result).toHaveLength(1);
  });

  it("should return empty when filters don't match", () => {
    const result = filterOpportunities(mockOpportunities, {
      category: "Job",
      location: "Herat",
    });
    expect(result).toHaveLength(0);
  });
});

// ============================================
// SORT TESTS
// ============================================
describe("filterOpportunities - Sort", () => {
  it("should sort by newest", () => {
    const result = filterOpportunities(mockOpportunities, { sort: "newest" });
    expect(result[0].id).toBe("3");
  });

  it("should sort by oldest", () => {
    const result = filterOpportunities(mockOpportunities, { sort: "oldest" });
    expect(result[0].id).toBe("1");
  });

  it("should sort by most viewed", () => {
    const result = filterOpportunities(mockOpportunities, { sort: "views" });
    expect(result[0].views).toBe(200);
  });

  it("should sort by most saved", () => {
    const result = filterOpportunities(mockOpportunities, { sort: "saves" });
    expect(result[0].saves).toBe(50);
  });
});

// ============================================
// CALCULATE STATS TESTS
// ============================================
describe("calculateStats", () => {
  it("should calculate total count", () => {
    const stats = calculateStats(mockOpportunities);
    expect(stats.total).toBe(3);
  });

  it("should count jobs correctly", () => {
    const stats = calculateStats(mockOpportunities);
    expect(stats.jobs).toBe(1);
  });

  it("should count internships correctly", () => {
    const stats = calculateStats(mockOpportunities);
    expect(stats.internships).toBe(1);
  });

  it("should count scholarships correctly", () => {
    const stats = calculateStats(mockOpportunities);
    expect(stats.scholarships).toBe(1);
  });

  it("should count remote opportunities", () => {
    const stats = calculateStats(mockOpportunities);
    expect(stats.remote).toBe(2);
  });

  it("should handle empty array", () => {
    const stats = calculateStats([]);
    expect(stats.total).toBe(0);
    expect(stats.jobs).toBe(0);
  });
});
