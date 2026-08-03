"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  Briefcase,
  LayoutDashboard,
  FileUser,
  Info,
  Mail,
  PlusCircle,
  ChevronRight,
  LogIn,
  User,
} from "lucide-react";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Logo from "../shared/Logo.jsx";
import ThemeToggle from "../shared/ThemeToggle.jsx";
import Button from "../ui/Button.jsx";
import { useSavedStore } from "../../store/index.js";
import { cn } from "../../lib/utils.js";

// Icon map for nav links
const iconMap = {
  "/": Home,
  "/opportunities": Briefcase,
  "/dashboard": LayoutDashboard,
  "/cv-builder": FileUser,
  "/about": Info,
  "/contact": Mail,
};

export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const savedCount = useSavedStore((state) => state.getSavedCount());
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Saved", href: "/saved", badge: savedCount },
    { label: "Dashboard", href: "/dashboard" },
    { label: "CV Builder", href: "/cv-builder" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-[70]",
              "w-[300px] max-w-[85vw]",
              "bg-white dark:bg-dark-card",
              "shadow-2xl",
              "flex flex-col",
              "overflow-hidden",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-dark-border">
              <Logo size="small" onClick={onClose} />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <motion.button
                  onClick={onClose}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    "bg-gray-100 hover:bg-gray-200",
                    "dark:bg-dark-border dark:hover:bg-gray-600",
                    "text-gray-600 dark:text-gray-300",
                    "transition-colors duration-200",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* USER SECTION - Show when signed in */}
            {isLoaded && isSignedIn && user && (
              <div className="p-4 border-b border-gray-100 dark:border-dark-border">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl">
                  <div className="flex-shrink-0">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "w-12 h-12 border-2 border-yellow-500 hover:border-yellow-400",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {user?.firstName || user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = iconMap[item.href] || Briefcase;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between",
                          "px-4 py-3 rounded-xl",
                          "font-medium text-sm",
                          "transition-all duration-200",
                          "group",
                          isActive
                            ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              "transition-colors duration-200",
                              isActive
                                ? "bg-yellow-100 dark:bg-yellow-500/20"
                                : "bg-gray-100 dark:bg-dark-border group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
                            )}
                          >
                            <Icon
                              size={16}
                              className={
                                isActive
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-gray-500 dark:text-gray-400"
                              }
                            />
                          </div>
                          <span>{item.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge > 0 && (
                            <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight
                            size={14}
                            className={cn(
                              "transition-all duration-200",
                              isActive
                                ? "text-yellow-500 translate-x-0.5"
                                : "text-gray-300 dark:text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5",
                            )}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Drawer Footer - Different for signed in vs signed out */}
            <div className="p-4 border-t border-gray-100 dark:border-dark-border space-y-3">
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    // SIGNED IN - Show Add Opportunity button
                    <Button
                      href="/add-opportunity"
                      variant="primary"
                      size="md"
                      icon={PlusCircle}
                      fullWidth
                      onClick={onClose}
                    >
                      Add Opportunity
                    </Button>
                  ) : (
                    // SIGNED OUT - Show Sign In & Sign Up buttons
                    <div className="space-y-2">
                      <Button
                        href="/sign-in"
                        variant="primary"
                        size="md"
                        icon={LogIn}
                        fullWidth
                        onClick={onClose}
                      >
                        Sign In
                      </Button>
                      <Button
                        href="/sign-up"
                        variant="outline"
                        size="md"
                        icon={User}
                        fullWidth
                        onClick={onClose}
                      >
                        Create Account
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* App Version */}
              <p className="text-center text-xs text-gray-400 dark:text-gray-600">
                KaarYab Afghanistan v1.0.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
