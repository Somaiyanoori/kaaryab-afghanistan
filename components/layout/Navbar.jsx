"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, PlusCircle, Bookmark, Search, LogIn } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import Logo from "../shared/Logo.jsx";
import ThemeToggle from "../shared/ThemeToggle.jsx";
import MobileNav from "./MobileNav.jsx";
import Button from "../ui/Button.jsx";
import { useSavedStore } from "../../store/index.js";
import { cn } from "../../lib/utils.js";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Tracker", href: "/tracker" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "CV Builder", href: "/cv-builder" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PAGES_WITH_DARK_HERO = [
  "/",
  "/opportunities",
  "/dashboard",
  "/add-opportunity",
  "/saved",
  "/tracker",
  "/about",
  "/contact",
  "/cv-builder",
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isSignedIn, isLoaded } = useAuth();
  const savedCount = useSavedStore((state) => state.getSavedCount());

  const hasDarkHero = PAGES_WITH_DARK_HERO.some((page) => {
    if (page === "/") return pathname === "/";
    return pathname.startsWith(page);
  });

  const shouldShowScrolled = scrolled || !hasDarkHero;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0",
          "z-50",
          "transition-all duration-300",
          shouldShowScrolled
            ? [
                "bg-white/95 dark:bg-slate-900/95",
                "backdrop-blur-md",
                "shadow-md dark:shadow-slate-800/50",
                "border-b border-gray-100 dark:border-slate-800",
                "py-3",
              ]
            : ["bg-transparent", "py-5"],
        )}
      >
        <nav
          className="container-custom flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Logo variant={shouldShowScrolled ? "auto" : "light"} />

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg",
                    "text-sm font-medium",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
                    active
                      ? shouldShowScrolled
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-yellow-400"
                      : [
                          shouldShowScrolled
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-white/90",
                          "hover:text-yellow-600 dark:hover:text-yellow-400",
                          "hover:bg-yellow-50 dark:hover:bg-yellow-500/10",
                        ],
                  )}
                >
                  {item.label}

                  <AnimatePresence>
                    {active && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-yellow-500 rounded-full"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/opportunities">
                    <motion.button
                      className={cn(
                        "hidden sm:flex w-9 h-9 rounded-lg items-center justify-center",
                        "bg-gray-100 hover:bg-gray-200",
                        "dark:bg-slate-800 dark:hover:bg-slate-700",
                        "text-gray-600 dark:text-gray-300",
                        "transition-colors duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Search opportunities"
                    >
                      <Search size={16} />
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <ThemeToggle />

            <Link href="/saved" className="relative focus-visible:outline-none">
              <motion.button
                className={cn(
                  "relative w-9 h-9 rounded-lg flex items-center justify-center",
                  shouldShowScrolled
                    ? "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
                  shouldShowScrolled
                    ? "text-gray-600 dark:text-gray-300"
                    : "text-white",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Saved opportunities ${mounted && savedCount > 0 ? `(${savedCount})` : ""}`}
              >
                <Bookmark
                  size={16}
                  className={
                    mounted && savedCount > 0
                      ? "text-yellow-500 fill-yellow-500"
                      : ""
                  }
                />

                <AnimatePresence>
                  {mounted && savedCount > 0 && (
                    <motion.span
                      key={savedCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className={cn(
                        "absolute -top-1.5 -right-1.5",
                        "min-w-[18px] h-[18px] px-1",
                        "bg-yellow-500 text-gray-900",
                        "text-[10px] font-bold",
                        "rounded-full",
                        "flex items-center justify-center",
                        "border-2",
                        shouldShowScrolled
                          ? "border-white dark:border-slate-900"
                          : "border-slate-900",
                      )}
                    >
                      {savedCount > 99 ? "99+" : savedCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            {isLoaded && (
              <>
                {isSignedIn ? (
                  <>
                    <div className="hidden md:block">
                      <Button
                        href="/add-opportunity"
                        variant="primary"
                        size="md"
                        icon={PlusCircle}
                      >
                        Add Opportunity
                      </Button>
                    </div>

                    <div className="ml-1">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox:
                              "w-9 h-9 border-2 border-yellow-500 hover:border-yellow-400",
                          },
                        }}
                        afterSignOutUrl="/"
                      />
                    </div>
                  </>
                ) : (
                  <div className="hidden md:block">
                    <Button
                      href="/sign-in"
                      variant="primary"
                      size="md"
                      icon={LogIn}
                    >
                      Sign In
                    </Button>
                  </div>
                )}
              </>
            )}

            <motion.button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden w-9 h-9 rounded-lg flex items-center justify-center",
                shouldShowScrolled
                  ? "bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
                  : "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={18} />
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
