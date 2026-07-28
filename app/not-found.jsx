"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-20 pb-12 px-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative mb-8"
        >
          <div
            className="text-[150px] md:text-[200px] font-black leading-none"
            style={{
              background:
                "linear-gradient(135deg, #EAB308 0%, #F97316 50%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Sora, sans-serif",
            }}
          >
            404
          </div>

          {/* Floating Compass Icon */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white dark:border-slate-900">
              <Compass size={48} className="text-white" strokeWidth={2} />
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-3"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Lost in the Journey?
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
        >
          The page you are looking for does not exist or has been moved. Let us
          help you find your way back.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-gray-900 font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              <Home size={16} />
              <span>Back to Home</span>
            </motion.button>
          </Link>

          <Link href="/opportunities">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-yellow-500 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-all group"
            >
              <Search size={16} />
              <span>Browse Opportunities</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
