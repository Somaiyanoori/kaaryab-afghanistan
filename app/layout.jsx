import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { cn } from "../lib/utils.js";
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

export const metadata = {
  title: {
    template: "%s | KaarYab Afghanistan",
    default: "KaarYab Afghanistan - Find Jobs, Scholarships & Opportunities",
  },
  description:
    "Discover jobs, internships, scholarships, remote work, and skill-building opportunities across Afghanistan. Free platform for Afghan youth.",
  keywords: [
    "Afghanistan jobs",
    "scholarships Afghanistan",
    "internships Kabul",
    "remote work Afghanistan",
  ],
  authors: [{ name: "KaarYab Team" }],
  creator: "KaarYab Afghanistan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaaryab.af",
    title: "KaarYab Afghanistan - Opportunity Finder Platform",
    description:
      "Find jobs, scholarships, internships, and remote work opportunities across Afghanistan.",
    siteName: "KaarYab Afghanistan",
  },
  twitter: {
    card: "summary_large_image",
    title: "KaarYab Afghanistan",
    description: "Find opportunities across Afghanistan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${plusJakarta.variable} ${sora.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        className={`
          ${plusJakarta.className}
          bg-gray-50 dark:bg-dark-bg
          text-gray-900 dark:text-dark-text
          transition-colors duration-300
          antialiased
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Demo Data Banner */}
          <div className="bg-yellow-500 text-gray-900 text-center py-2 px-4 text-sm font-medium">
            ⚠️ This platform uses demo data for educational purposes only
          </div>

          {/* Main Content */}
          {children}

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
