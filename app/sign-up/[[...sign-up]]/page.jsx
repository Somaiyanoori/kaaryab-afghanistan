"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Background decoration (only in dark mode) */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-500/30 rounded-full">
            <Rocket
              size={12}
              className="text-yellow-600 dark:text-yellow-400"
            />
            <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-wider">
              Join Us Today
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Start finding opportunities in Afghanistan
          </p>
        </motion.div>

        {/* Clerk Sign Up Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center"
        >
          <SignUp />
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6"
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-500 dark:hover:text-yellow-400 font-semibold"
          >
            Sign in here
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
