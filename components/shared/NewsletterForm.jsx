"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils.js";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubscribed(true);
    toast.success("Successfully subscribed! 🎉");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting || isSubscribed}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg",
            "bg-white/10 dark:bg-white/5",
            "border border-white/20 dark:border-white/10",
            "text-white placeholder-gray-400",
            "text-sm",
            "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          aria-label="Email for newsletter"
        />

        <motion.button
          type="submit"
          disabled={isSubmitting || isSubscribed}
          className={cn(
            "flex items-center justify-center",
            "w-11 h-11 rounded-lg",
            "bg-yellow-500 hover:bg-yellow-400",
            "text-gray-900",
            "transition-all duration-200",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            "shadow-md hover:shadow-lg",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Subscribe to newsletter"
        >
          {isSubscribed ? (
            <CheckCircle2 size={18} />
          ) : isSubmitting ? (
            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </motion.button>
      </div>

      {isSubscribed && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-yellow-400"
        >
          ✓ Thanks for subscribing! Watch your inbox.
        </motion.p>
      )}
    </form>
  );
}
