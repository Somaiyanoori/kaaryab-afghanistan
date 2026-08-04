import { z } from "zod";

// Opportunity validation schema
export const opportunitySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be less than 150 characters"),

  organization: z
    .string()
    .min(2, "Organization name is required")
    .max(100, "Organization name too long"),

  category: z.string().min(1, "Please select a category"),

  location: z.string().min(1, "Please select a location"),

  type: z.enum(["Remote", "On-site", "Hybrid"], {
    message: "Please select a work type",
  }),

  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((date) => {
      const d = new Date(date);
      const now = new Date();
      return d > now;
    }, "Deadline must be in the future"),

  shortDesc: z
    .string()
    .min(20, "Short description must be at least 20 characters")
    .max(300, "Short description must be less than 300 characters"),

  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be less than 2000 characters"),

  requirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .min(1, "Add at least one requirement"),

  applyLink: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)"),

  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),

  contactEmail: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),

  salary: z.string().optional(),
  duration: z.string().optional(),
  seats: z.string().optional(),
  gender: z.enum(["Any", "Male", "Female"]).default("Any"),
  language: z.enum(["Any", "Dari", "Pashto", "English"]).default("Any"),
});

// Contact form validation schema
export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

  email: z.string().email("Please enter a valid email"),

  subject: z.string().min(1, "Please select a subject"),

  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message too long"),
});

// CV validation schema
export const cvPersonalSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  jobTitle: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  linkedin: z.string().url("Valid URL required").optional().or(z.literal("")),
  summary: z.string().max(500, "Summary too long").optional(),
});
