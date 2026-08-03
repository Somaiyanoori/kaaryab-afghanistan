import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

// Clean up after each test
afterEach(() => {
  cleanup();
});

// ============================================
// MOCK NEXT/NAVIGATION
// ============================================
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

// ============================================
// MOCK NEXT/LINK
// ============================================
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));
