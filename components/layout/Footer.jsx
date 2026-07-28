"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Heart, ArrowUpRight } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import Logo from "../shared/Logo.jsx";
import NewsletterForm from "../shared/NewsletterForm.jsx";
import { cn } from "../../lib/utils.js";

// ============================================
// FOOTER LINKS DATA
// ============================================
const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All Opportunities", href: "/opportunities" },
  { label: "Categories", href: "/opportunities" },
  { label: "Featured", href: "/opportunities?featured=true" },
  { label: "Saved", href: "/saved" },
];

const resourceLinks = [
  { label: "Add Opportunity", href: "/add-opportunity" },
  { label: "CV Builder", href: "/cv-builder" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    icon: FaFacebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-500",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-blue-600",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:text-sky-400",
  },
  {
    icon: FaGithub,
    href: "https://github.com",
    label: "GitHub",
    color: "hover:text-white",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 dark:bg-slate-950 text-gray-300 overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-blue-600" />

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom pt-16 pb-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* COLUMN 1: BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Logo size="default" />

            <p className="text-sm text-gray-400 leading-relaxed">
              The opportunity finder platform designed to help Afghan youth
              discover jobs, scholarships, internships, and skill-building
              opportunities.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "w-9 h-9 rounded-lg",
                      "bg-white/5 hover:bg-white/10",
                      "border border-white/10",
                      "flex items-center justify-center",
                      "text-gray-400 transition-all duration-200",
                      social.color,
                    )}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* COLUMN 2: EXPLORE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-yellow-500 rounded-full" />
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex items-center gap-1.5",
                      "text-sm text-gray-400",
                      "hover:text-yellow-500",
                      "transition-colors duration-200",
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: RESOURCES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-full" />
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex items-center gap-1.5",
                      "text-sm text-gray-400",
                      "hover:text-yellow-500",
                      "transition-colors duration-200",
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 4: CONNECT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-green-500 rounded-full" />
              Get in Touch
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email us at</p>
                  <a
                    href="mailto:hello@kaaryab.af"
                    className="text-sm text-gray-300 hover:text-yellow-500 transition-colors"
                  >
                    hello@kaaryab.af
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Located in</p>
                  <p className="text-sm text-gray-300">Herat, Afghanistan</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Working hours</p>
                  <p className="text-sm text-gray-300">Sat-Thu: 9AM - 6PM</p>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white mb-3">
                Subscribe to Newsletter
              </h4>
              <NewsletterForm />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-gray-500">
            <span>© {currentYear}</span>
            <span className="text-yellow-500 font-semibold">
              KaarYab Afghanistan
            </span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-flex"
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
            </motion.span>
            <span>for Afghan Youth</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Built with</span>
            <span className="text-white font-semibold">Next.js</span>
            <span>+</span>
            <span className="text-yellow-500 font-semibold">Tailwind CSS</span>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-center text-xs text-gray-600">
            ⚠️ This platform uses demo data for educational and portfolio
            purposes only. All opportunities shown are samples and not real
            listings.
          </p>
        </div>
      </div>
    </footer>
  );
}
