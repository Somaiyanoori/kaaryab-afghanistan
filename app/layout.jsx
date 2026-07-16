"use client";

import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${plusJakarta.className} bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            containerStyle={{
              top: 80,
            }}
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1E293B",
                color: "#F1F5F9",
                border: "1px solid #334155",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 16px",
                maxWidth: "400px",
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
              loading: {
                iconTheme: {
                  primary: "#3B82F6",
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
