import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock Clerk
vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: { id: "test_user_123" },
    isLoaded: true,
    isSignedIn: true,
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    userId: "test_user_123",
  }),
  SignIn: () => null,
  SignUp: () => null,
  UserButton: () => null,
  SignedIn: ({ children }) => children,
  SignedOut: () => null,
  ClerkProvider: ({ children }) => children,
}));

// Mock Supabase
vi.mock("../lib/supabase.js", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null })),
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: null, error: null })),
          })),
        })),
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  },
}));

// Mock lib/db.js
vi.mock("../lib/db.js", () => ({
  getAllOpportunities: vi.fn(() => Promise.resolve([])),
  createOpportunity: vi.fn(() =>
    Promise.resolve({ id: "new-id", slug: "test-slug" }),
  ),
  updateOpportunityById: vi.fn(() => Promise.resolve({})),
  deleteOpportunityById: vi.fn(() => Promise.resolve()),
  saveOpportunityDB: vi.fn(() => Promise.resolve()),
  removeSavedOpportunityDB: vi.fn(() => Promise.resolve()),
  getSavedOpportunitiesDB: vi.fn(() => Promise.resolve([])),
  clearAllSavedDB: vi.fn(() => Promise.resolve()),
}));
