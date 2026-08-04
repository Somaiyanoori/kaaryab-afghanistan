import { describe, it, expect } from "vitest";
import {
  opportunitySchema,
  contactSchema,
  cvPersonalSchema,
} from "../../lib/validators.js";

// Opportunity schema tests
describe("opportunitySchema", () => {
  const validOpportunity = {
    title: "Frontend Developer Intern",
    organization: "Kabul Tech Community",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: "2027-12-31",
    shortDesc: "This is a valid short description",
    description:
      "This is a valid full description that is more than fifty characters long",
    requirements: ["Requirement 1"],
    applyLink: "https://example.com/apply",
    tags: ["React"],
    contactEmail: "test@example.com",
    gender: "Any",
    language: "Any",
  };

  it("should validate a correct opportunity", () => {
    const result = opportunitySchema.safeParse(validOpportunity);
    expect(result.success).toBe(true);
  });

  it("should reject short title", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      title: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing category", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      category: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject past deadline", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      deadline: "2020-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid apply URL", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      applyLink: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short description", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      description: "Too short",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty requirements", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      requirements: [],
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid work type", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      type: "InvalidType",
    });
    expect(result.success).toBe(false);
  });

  it("should accept optional contact email as empty", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      contactEmail: "",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid contact email", () => {
    const result = opportunitySchema.safeParse({
      ...validOpportunity,
      contactEmail: "not-an-email",
    });
    expect(result.success).toBe(false);
  });
});

// Contact schema tests
describe("contactSchema", () => {
  const validContact = {
    fullName: "Ahmad Karimi",
    email: "ahmad@example.com",
    subject: "General Inquiry",
    message: "This is a valid message with enough characters to pass",
  };

  it("should validate correct contact form", () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it("should reject short name", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      fullName: "A",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty subject", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      subject: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject short message", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });
});

// CV personal schema tests
describe("cvPersonalSchema", () => {
  const validCV = {
    fullName: "Ahmad Karimi",
    jobTitle: "Frontend Developer",
    email: "ahmad@example.com",
    phone: "+93 700 000 000",
    city: "Kabul",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/ahmad",
    summary: "A brief summary",
  };

  it("should validate correct CV data", () => {
    const result = cvPersonalSchema.safeParse(validCV);
    expect(result.success).toBe(true);
  });

  it("should reject short name", () => {
    const result = cvPersonalSchema.safeParse({
      ...validCV,
      fullName: "A",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = cvPersonalSchema.safeParse({
      ...validCV,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("should accept empty optional fields", () => {
    const result = cvPersonalSchema.safeParse({
      fullName: "Ahmad Karimi",
      email: "ahmad@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should accept empty website URL", () => {
    const result = cvPersonalSchema.safeParse({
      ...validCV,
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid website URL", () => {
    const result = cvPersonalSchema.safeParse({
      ...validCV,
      website: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});
