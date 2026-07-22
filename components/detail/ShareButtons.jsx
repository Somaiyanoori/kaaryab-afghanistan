"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, X } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils.js";

export default function ShareButtons({ opportunity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = `Check out this opportunity: ${opportunity.title}`;
  const text = `${title} at ${opportunity.organization}`;

  const shareOptions = [
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color:
        "hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20",
      url: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      color: "hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20",
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
  ];

  const handleShare = async () => {
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled
      }
    }
    // Fallback to modal
    setIsOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleSocialShare = (shareUrl) => {
    window.open(shareUrl, "_blank", "width=600,height=500");
    setIsOpen(false);
  };

  return (
    <>
      {/* Share Button */}
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center justify-center",
          "w-10 h-10 rounded-lg",
          "bg-gray-100 dark:bg-slate-700",
          "hover:bg-gray-200 dark:hover:bg-slate-600",
          "text-gray-700 dark:text-gray-300",
          "transition-colors duration-200",
        )}
        aria-label="Share opportunity"
      >
        <Share2 size={18} />
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "w-[90vw] max-w-md",
                "bg-white dark:bg-slate-800",
                "rounded-2xl p-6",
                "shadow-2xl",
                "z-[90]",
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Share Opportunity
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Social Options */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {shareOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.name}
                      onClick={() => handleSocialShare(option.url)}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-xl",
                        "bg-gray-50 dark:bg-slate-700",
                        "text-gray-600 dark:text-gray-300",
                        "transition-all duration-200",
                        option.color,
                      )}
                      title={option.name}
                    >
                      <Icon size={20} />
                      <span className="text-[10px] font-medium">
                        {option.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Copy Link */}
              <div
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg",
                  "bg-gray-50 dark:bg-slate-700",
                  "border border-gray-200 dark:border-slate-600",
                )}
              >
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 px-2 truncate focus:outline-none"
                />
                <motion.button
                  onClick={handleCopyLink}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md",
                    "text-xs font-semibold",
                    "transition-colors duration-200",
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 hover:bg-yellow-400 text-gray-900",
                  )}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
