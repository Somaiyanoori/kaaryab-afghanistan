"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "kaaryab_recently_viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out expired opportunities
        setRecentlyViewed(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setRecentlyViewed([]);
    }
  }, []);

  // Add an opportunity to recently viewed
  const addToRecentlyViewed = useCallback((opportunity) => {
    if (!opportunity?.id) return;

    setRecentlyViewed((prev) => {
      // Remove if already exists (to move it to front)
      const filtered = prev.filter((item) => item.id !== opportunity.id);

      // Add to front with timestamp
      const newItem = {
        id: opportunity.id,
        slug: opportunity.slug || opportunity.id,
        title: opportunity.title,
        organization: opportunity.organization,
        category: opportunity.category,
        location: opportunity.location,
        type: opportunity.type,
        deadline: opportunity.deadline,
        shortDesc: opportunity.shortDesc || opportunity.description,
        featured: opportunity.featured || false,
        urgent: opportunity.urgent || false,
        verified: opportunity.verified || false,
        views: opportunity.views || 0,
        saves: opportunity.saves || 0,
        postedDate: opportunity.postedDate,
        viewedAt: new Date().toISOString(),
      };

      const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }

      return updated;
    });
  }, []);

  // Remove a specific item
  const removeFromRecentlyViewed = useCallback((id) => {
    setRecentlyViewed((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Clear all
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    recentlyViewed: mounted ? recentlyViewed : [],
    addToRecentlyViewed,
    removeFromRecentlyViewed,
    clearRecentlyViewed,
    hasRecentlyViewed: mounted && recentlyViewed.length > 0,
    count: mounted ? recentlyViewed.length : 0,
  };
}
