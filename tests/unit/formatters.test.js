import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatRelativeDate,
  getDeadlineStatus,
} from "../../lib/utils.js";

// ============================================
// FORMAT DATE TESTS
// ============================================
describe("formatDate", () => {
  it("should format a valid ISO date correctly", () => {
    const result = formatDate("2026-12-25");
    expect(result).toBe("Dec 25, 2026");
  });

  it("should return 'N/A' for null input", () => {
    expect(formatDate(null)).toBe("N/A");
  });

  it("should return 'N/A' for undefined input", () => {
    expect(formatDate(undefined)).toBe("N/A");
  });

  it("should return 'Invalid date' for invalid input", () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });

  it("should format different months correctly", () => {
    expect(formatDate("2026-01-15")).toBe("Jan 15, 2026");
    expect(formatDate("2026-06-30")).toBe("Jun 30, 2026");
    expect(formatDate("2026-12-01")).toBe("Dec 1, 2026");
  });
});

// ============================================
// FORMAT RELATIVE DATE TESTS
// ============================================
describe("formatRelativeDate", () => {
  it("should return 'X weeks ago' for less than a month", () => {
    // Use a fixed date approach
    const date = new Date();
    date.setDate(date.getDate() - 14);
    const dateString = date.toISOString().split("T")[0];
    const result = formatRelativeDate(dateString);
    expect(result).toBe("2 weeks ago");
  });

  it("should return formatted date for older dates", () => {
    expect(formatRelativeDate("2020-01-15")).toBe("Jan 15, 2020");
  });

  it("should return empty string for null", () => {
    expect(formatRelativeDate(null)).toBe("");
  });

  it("should return empty string for invalid date", () => {
    expect(formatRelativeDate("invalid-date")).toBe("");
  });

  it("should handle dates within the last week", () => {
    // Use a date 3 days ago
    const date = new Date();
    date.setDate(date.getDate() - 3);
    const dateString = date.toISOString().split("T")[0];
    const result = formatRelativeDate(dateString);
    // Should contain "days ago" text
    expect(result).toMatch(/days? ago|Today|Yesterday/);
  });

  it("should handle recent dates without errors", () => {
    const today = new Date().toISOString().split("T")[0];
    const result = formatRelativeDate(today);
    // Should return SOMETHING (Today or a valid string)
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });
});

// ============================================
// GET DEADLINE STATUS TESTS
// ============================================
describe("getDeadlineStatus", () => {
  // Helper: Create date X days from now
  const daysFromNow = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  it("should return 'expired' for past dates", () => {
    const result = getDeadlineStatus(daysFromNow(-10));
    expect(result.status).toBe("expired");
    expect(result.label).toBe("Expired");
    expect(result.daysLeft).toBe(0);
  });

  it("should return 'urgent' for dates within 7 days", () => {
    const result = getDeadlineStatus(daysFromNow(3));
    expect(result.status).toBe("urgent");
    expect(result.daysLeft).toBeLessThanOrEqual(7);
    expect(result.daysLeft).toBeGreaterThan(0);
  });

  it("should return 'soon' for dates within 8-30 days", () => {
    const result = getDeadlineStatus(daysFromNow(15));
    expect(result.status).toBe("soon");
    expect(result.daysLeft).toBeGreaterThan(7);
    expect(result.daysLeft).toBeLessThanOrEqual(30);
  });

  it("should return 'active' for dates more than 30 days away", () => {
    const result = getDeadlineStatus(daysFromNow(60));
    expect(result.status).toBe("active");
    expect(result.daysLeft).toBeGreaterThan(30);
  });

  it("should return unknown status for null deadline", () => {
    const result = getDeadlineStatus(null);
    expect(result.status).toBe("unknown");
    expect(result.label).toBe("No deadline");
    expect(result.daysLeft).toBe(null);
  });

  it("should include CSS classes for expired", () => {
    const result = getDeadlineStatus(daysFromNow(-5));
    expect(result.colorClass).toContain("gray");
  });

  it("should include CSS classes for urgent (red)", () => {
    const result = getDeadlineStatus(daysFromNow(2));
    expect(result.colorClass).toContain("red");
  });

  it("should include CSS classes for soon (amber)", () => {
    const result = getDeadlineStatus(daysFromNow(20));
    expect(result.colorClass).toContain("amber");
  });

  it("should include CSS classes for active (green)", () => {
    const result = getDeadlineStatus(daysFromNow(90));
    expect(result.colorClass).toContain("green");
  });

  it("should have label ending with 'left' for future dates", () => {
    const result = getDeadlineStatus(daysFromNow(5));
    expect(result.label).toContain("left");
  });

  it("should have daysLeft as number for future dates", () => {
    const result = getDeadlineStatus(daysFromNow(5));
    expect(typeof result.daysLeft).toBe("number");
    expect(result.daysLeft).toBeGreaterThan(0);
  });
});
