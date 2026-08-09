"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useCountUp Hook
 *
 * Animates a number from 0 to target value
 * Uses requestAnimationFrame for smooth 60fps animation
 *
 * USAGE:
 * const count = useCountUp(500, 2000, shouldStart);
 * // Counts from 0 to 500 over 2000ms when shouldStart is true
 */
export function useCountUp(end, duration = 2000, shouldStart = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;

    // Reset
    setCount(0);
    startTimeRef.current = null;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOutCubic * end);
      setCount(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure final value is exact
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
}
