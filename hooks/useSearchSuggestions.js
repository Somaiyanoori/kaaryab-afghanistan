"use client";

import { useMemo } from "react";

/**
 * useSearchSuggestions Hook
 *
 * Generates smart search suggestions from opportunities data
 * Returns matches grouped by type (title, organization, tag, location)
 */
export function useSearchSuggestions(opportunities, query, maxResults = 8) {
  return useMemo(() => {
    if (!query || query.trim().length < 2) {
      return {
        suggestions: [],
        totalCount: 0,
      };
    }

    const q = query.toLowerCase().trim();
    const results = [];
    const seenIds = new Set();

    // 1. Match by TITLE (highest priority)
    opportunities.forEach((opp) => {
      if (results.length >= maxResults) return;
      if (seenIds.has(opp.id)) return;

      if (opp.title?.toLowerCase().includes(q)) {
        results.push({
          type: "opportunity",
          id: opp.id,
          slug: opp.slug || opp.id,
          title: opp.title,
          subtitle: opp.organization,
          category: opp.category,
          location: opp.location,
          matchType: "title",
        });
        seenIds.add(opp.id);
      }
    });

    // 2. Match by ORGANIZATION
    opportunities.forEach((opp) => {
      if (results.length >= maxResults) return;
      if (seenIds.has(opp.id)) return;

      if (opp.organization?.toLowerCase().includes(q)) {
        results.push({
          type: "opportunity",
          id: opp.id,
          slug: opp.slug || opp.id,
          title: opp.title,
          subtitle: opp.organization,
          category: opp.category,
          location: opp.location,
          matchType: "organization",
        });
        seenIds.add(opp.id);
      }
    });

    // 3. Match by TAGS
    opportunities.forEach((opp) => {
      if (results.length >= maxResults) return;
      if (seenIds.has(opp.id)) return;

      if (opp.tags?.some((tag) => tag.toLowerCase().includes(q))) {
        results.push({
          type: "opportunity",
          id: opp.id,
          slug: opp.slug || opp.id,
          title: opp.title,
          subtitle: opp.organization,
          category: opp.category,
          location: opp.location,
          matchType: "tag",
        });
        seenIds.add(opp.id);
      }
    });

    // 4. Match by LOCATION
    opportunities.forEach((opp) => {
      if (results.length >= maxResults) return;
      if (seenIds.has(opp.id)) return;

      if (opp.location?.toLowerCase().includes(q)) {
        results.push({
          type: "opportunity",
          id: opp.id,
          slug: opp.slug || opp.id,
          title: opp.title,
          subtitle: opp.organization,
          category: opp.category,
          location: opp.location,
          matchType: "location",
        });
        seenIds.add(opp.id);
      }
    });

    // Get total matching count
    const totalMatches = opportunities.filter((opp) => {
      return (
        opp.title?.toLowerCase().includes(q) ||
        opp.organization?.toLowerCase().includes(q) ||
        opp.location?.toLowerCase().includes(q) ||
        opp.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }).length;

    return {
      suggestions: results,
      totalCount: totalMatches,
    };
  }, [opportunities, query, maxResults]);
}
