"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ClerkThemeProvider({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: {
          colorPrimary: "#EAB308",
          borderRadius: "0.75rem",
          colorBackground: isDark ? "#1E293B" : "#FFFFFF",
          colorText: isDark ? "#F1F5F9" : "#111827",
          colorTextSecondary: isDark ? "#94A3B8" : "#6B7280",
          colorInputBackground: isDark ? "#0F172A" : "#F9FAFB",
          colorInputText: isDark ? "#F1F5F9" : "#111827",
        },
        elements: {
          formButtonPrimary:
            "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-semibold normal-case",
          footerActionLink: "text-yellow-500 hover:text-yellow-400",
          card: isDark
            ? "bg-slate-800 border border-slate-700 shadow-2xl"
            : "bg-white border border-gray-200 shadow-xl",
          headerTitle: isDark ? "text-white" : "text-gray-900",
          headerSubtitle: isDark ? "text-gray-400" : "text-gray-600",
          socialButtonsBlockButton: isDark
            ? "border-slate-700 hover:bg-slate-700 text-white"
            : "border-gray-200 hover:bg-gray-50 text-gray-900",
          socialButtonsBlockButtonText: isDark ? "text-white" : "text-gray-900",
          dividerLine: isDark ? "bg-slate-700" : "bg-gray-200",
          dividerText: isDark ? "text-gray-400" : "text-gray-500",
          formFieldLabel: isDark ? "text-gray-300" : "text-gray-700",
          formFieldInput: isDark
            ? "bg-slate-900 border-slate-700 text-white"
            : "bg-white border-gray-300 text-gray-900",
          footerActionText: isDark ? "text-gray-400" : "text-gray-600",
          identityPreviewText: isDark ? "text-white" : "text-gray-900",
          identityPreviewEditButton: "text-yellow-500 hover:text-yellow-400",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
