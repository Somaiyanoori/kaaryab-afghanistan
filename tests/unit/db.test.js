import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getAllOpportunities,
  createOpportunity,
  updateOpportunityById,
  deleteOpportunityById,
} from "../../lib/db.js";

describe("Database Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllOpportunities", () => {
    it("should return array of opportunities", async () => {
      const result = await getAllOpportunities();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should not throw error", async () => {
      await expect(getAllOpportunities()).resolves.not.toThrow();
    });
  });

  describe("createOpportunity", () => {
    it("should create new opportunity", async () => {
      const data = {
        title: "Test Job",
        organization: "Test Org",
        category: "Job",
      };
      const result = await createOpportunity(data);
      expect(result).toBeDefined();
    });
  });

  describe("updateOpportunityById", () => {
    it("should update opportunity", async () => {
      const result = await updateOpportunityById("test-id", {
        title: "Updated",
      });
      expect(result).toBeDefined();
    });
  });

  describe("deleteOpportunityById", () => {
    it("should delete opportunity", async () => {
      await expect(deleteOpportunityById("test-id")).resolves.not.toThrow();
    });
  });
});
