"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";
import { parseISO, differenceInSeconds } from "date-fns";
import { cn } from "../../lib/utils.js";

export default function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      try {
        const deadlineDate = parseISO(deadline);
        const now = new Date();
        const totalSeconds = differenceInSeconds(deadlineDate, now);

        if (totalSeconds <= 0) {
          setTimeLeft({ expired: true });
          return;
        }

        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds, expired: false });
      } catch {
        setTimeLeft({ expired: true });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [deadline, mounted]);

  if (!mounted || !timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 dark:bg-slate-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-4 rounded-xl",
          "bg-gray-100 dark:bg-slate-700",
          "text-gray-500 dark:text-gray-400",
        )}
      >
        <AlertCircle size={18} />
        <span className="text-sm font-semibold">
          This opportunity has expired
        </span>
      </div>
    );
  }

  const isUrgent = timeLeft.days < 7;

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock
          size={14}
          className={isUrgent ? "text-red-500" : "text-yellow-500"}
        />
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          {isUrgent ? "⚡ Time Running Out!" : "Application Closes In"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "text-center rounded-lg p-2",
              isUrgent
                ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800",
            )}
          >
            <div
              className={cn(
                "text-xl md:text-2xl font-black tabular-nums",
                isUrgent
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-700 dark:text-yellow-400",
              )}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
