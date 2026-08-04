import { describe, it, expect } from "vitest";
import {
  truncateText,
  slugify,
  generateId,
  getInitials,
  getCategoryColors,
} from "../../lib/utils.js";

// GET INITIALS TESTS
describe("getInitials", () => {
  it("should get initials from full name", () => {
    expect(getInitials("Ahmad Karimi")).toBe("AK");
  });

  it("should handle single name", () => {
    expect(getInitials("Ahmad")).toBe("A");
  });

  it("should handle three or more names (max 2)", () => {
    expect(getInitials("Ahmad Karimi Noori")).toBe("AK");
  });

  it("should return '??' for empty string", () => {
    expect(getInitials("")).toBe("??");
  });

  it("should return '??' for null", () => {
    expect(getInitials(null)).toBe("??");
  });

  it("should return '??' for undefined", () => {
    expect(getInitials(undefined)).toBe("??");
  });

  it("should uppercase the initials", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});

// TRUNCATE TEXT TESTS
describe("truncateText", () => {
  it("should not truncate short text", () => {
    expect(truncateText("Hello", 100)).toBe("Hello");
  });

  it("should truncate long text with ellipsis", () => {
    const longText = "This is a very long text that should be truncated";
    const result = truncateText(longText, 20);
    expect(result).toBe("This is a very long...");
  });

  it("should use default max length of 100", () => {
    const text = "a".repeat(150);
    const result = truncateText(text);
    expect(result.length).toBe(103);
  });

  it("should return empty string for null", () => {
    expect(truncateText(null)).toBe("");
  });

  it("should return empty string for undefined", () => {
    expect(truncateText(undefined)).toBe("");
  });
});

// SLUGIFY TESTS
describe("slugify", () => {
  it("should convert text to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("should replace multiple spaces with single dash", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("should handle underscores", () => {
    expect(slugify("hello_world_test")).toBe("hello-world-test");
  });

  it("should remove leading and trailing dashes", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });

  it("should handle numbers", () => {
    expect(slugify("Job 123 Test")).toBe("job-123-test");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });
});

// GENERATE ID TESTS
describe("generateId", () => {
  it("should generate an ID with default prefix", () => {
    const id = generateId();
    expect(id).toMatch(/^id_\d+_[a-z0-9]+$/);
  });

  it("should generate an ID with custom prefix", () => {
    const id = generateId("user");
    expect(id.startsWith("user_")).toBe(true);
  });

  it("should generate unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("should generate 100 unique IDs", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });
});

// GET CATEGORY COLORS TESTS
describe("getCategoryColors", () => {
  it("should return colors for Job category", () => {
    const colors = getCategoryColors("Job");
    expect(colors).toHaveProperty("bg");
    expect(colors).toHaveProperty("text");
    expect(colors).toHaveProperty("hex");
    expect(colors.hex).toBe("#2563EB");
  });

  it("should return colors for Scholarship category", () => {
    const colors = getCategoryColors("Scholarship");
    expect(colors.hex).toBe("#9333EA");
  });

  it("should return colors for Remote Work category", () => {
    const colors = getCategoryColors("Remote Work");
    expect(colors.hex).toBe("#16A34A");
  });

  it("should fallback to Job colors for unknown category", () => {
    const colors = getCategoryColors("Unknown Category");
    expect(colors.hex).toBe("#2563EB");
  });

  it("should have gradient property", () => {
    const colors = getCategoryColors("Job");
    expect(colors.solidGradient).toContain("linear-gradient");
  });
});
