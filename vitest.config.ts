import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".next", "e2e/**"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "app/components/**/*.{ts,tsx}",
        "app/config/**/*.{ts,tsx}",
        "app/content/**/*.{ts,tsx}",
        "app/**/_components/**/*.{ts,tsx}",
      ],
      exclude: [
        "app/**/*.test.{ts,tsx}",
        "app/**/layout.tsx",
        "app/**/page.tsx",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
