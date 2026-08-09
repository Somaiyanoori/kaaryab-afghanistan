"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { generateSavedOpportunitiesPDF } from "../../lib/pdf-generator.js";
import { cn } from "../../lib/utils.js";

export default function ExportPDFButton({ opportunities = [] }) {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleExport = async () => {
    if (opportunities.length === 0) {
      toast.error("No opportunities to export");
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading("Generating your PDF...");

    try {
      const userName = user?.firstName || user?.fullName || "You";

      await generateSavedOpportunitiesPDF(opportunities, userName);

      toast.dismiss(loadingToast);
      toast.success("PDF downloaded successfully! 🎉");

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("PDF export error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      disabled={isGenerating || opportunities.length === 0}
      whileHover={{ scale: isGenerating ? 1 : 1.02 }}
      whileTap={{ scale: isGenerating ? 1 : 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "px-4 py-2.5 rounded-xl",
        "text-sm font-semibold",
        "shadow-md hover:shadow-lg",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500",
        isSuccess
          ? "bg-green-500 hover:bg-green-600 text-white"
          : isGenerating
            ? "bg-blue-500 text-white cursor-wait"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white",
        opportunities.length === 0 && "opacity-50 cursor-not-allowed",
      )}
      title={
        opportunities.length === 0
          ? "No opportunities to export"
          : "Download as PDF"
      }
    >
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>Downloaded!</span>
          </motion.div>
        ) : isGenerating ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={16} className="animate-spin" />
            <span>Generating...</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <FileDown size={16} />
            <span>Export PDF</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
