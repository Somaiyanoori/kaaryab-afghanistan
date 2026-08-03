import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    css: false,
    include: [
      "tests/unit/**/*.test.{js,jsx}",
      "tests/components/**/*.test.{js,jsx}",
    ],
    exclude: ["node_modules", "tests/e2e/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./"),
      // Alias framer-motion to a stub for tests
      "framer-motion": path.resolve(
        process.cwd(),
        "./tests/mocks/framer-motion.js",
      ),
    },
  },
});
