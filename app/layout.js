"use client";

import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar.jsx";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${plusJakarta.variable} ${sora.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        className={cn(
          plusJakarta.className,
          "bg-gray-50 dark:bg-dark-bg",
          "text-gray-900 dark:text-dark-text",
          "transition-colors duration-300",
          "antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Demo Data Banner */}
          <div className="bg-yellow-500 text-gray-900 text-center py-1.5 px-4 text-xs font-medium relative z-50">
            ⚠️ Demo Data — For Educational Purposes Only
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="min-h-screen">{children}</main>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1E293B",
                color: "#F1F5F9",
                border: "1px solid #334155",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                iconTheme: {
                  primary: "#EAB308",
                  secondary: "#1E293B",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#1E293B",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
