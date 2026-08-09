"use client";

import { formatDate } from "./utils.js";

/**
 * Generate PDF from saved opportunities
 * Creates a professional PDF list
 */
export async function generateSavedOpportunitiesPDF(
  opportunities,
  userName = "You",
) {
  // Dynamic import (only loads when needed)
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 20;

  // COVER HEADER
  // Yellow gradient background
  doc.setFillColor(234, 179, 8); // Yellow
  doc.rect(0, 0, pageWidth, 45, "F");

  // Overlay darker section
  doc.setFillColor(202, 138, 4); // Darker yellow
  doc.rect(0, 40, pageWidth, 5, "F");

  // Logo/Brand
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("KaarYab Afghanistan", margin, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Opportunity Finder Platform", margin, 28);

  doc.setFontSize(9);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    margin,
    36,
  );

  yPos = 60;

  // TITLE
  doc.setTextColor(17, 24, 39);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("My Saved Opportunities", margin, yPos);

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text(
    `${opportunities.length} opportunit${opportunities.length === 1 ? "y" : "ies"} saved by ${userName}`,
    margin,
    yPos,
  );

  yPos += 12;

  // Separator line
  doc.setDrawColor(234, 179, 8);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // OPPORTUNITIES LIST
  opportunities.forEach((opp, index) => {
    // Check if we need new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    // Card background
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, yPos, pageWidth - margin * 2, 55, 3, 3, "F");

    // Category color strip (left border)
    const categoryColors = {
      Job: [37, 99, 235], // Blue
      Internship: [13, 148, 136], // Teal
      Scholarship: [147, 51, 234], // Purple
      "Online Course": [79, 70, 229], // Indigo
      "Remote Work": [22, 163, 74], // Green
      "Training Program": [217, 119, 6], // Amber
      "Volunteer Work": [219, 39, 119], // Pink
    };

    const catColor = categoryColors[opp.category] || [107, 114, 128];
    doc.setFillColor(...catColor);
    doc.roundedRect(margin, yPos, 2, 55, 1, 1, "F");

    // Number badge
    doc.setFillColor(234, 179, 8);
    doc.circle(margin + 10, yPos + 10, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}`, margin + 10, yPos + 11.5, {
      align: "center",
    });

    // Title
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const title =
      opp.title.length > 55 ? opp.title.substring(0, 55) + "..." : opp.title;
    doc.text(title, margin + 18, yPos + 10);

    // Organization
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text(opp.organization || "N/A", margin + 18, yPos + 17);

    // Category badge
    doc.setFillColor(...catColor);
    doc.roundedRect(margin + 18, yPos + 22, 25, 5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text(opp.category, margin + 30.5, yPos + 25.5, {
      align: "center",
    });

    // Location + Type
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`📍 ${opp.location} · ${opp.type}`, margin + 48, yPos + 26);

    // Deadline
    doc.setTextColor(220, 38, 38);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(
      `⏰ Deadline: ${formatDate(opp.deadline)}`,
      margin + 18,
      yPos + 34,
    );

    // Description (short)
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const desc = opp.shortDesc || opp.description || "";
    const shortDesc = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
    const splitDesc = doc.splitTextToSize(
      shortDesc,
      pageWidth - margin * 2 - 20,
    );
    doc.text(splitDesc.slice(0, 2), margin + 18, yPos + 40);

    // Apply link
    if (opp.applyLink) {
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      const applyText = "🔗 Click here to apply";
      doc.textWithLink(applyText, margin + 18, yPos + 50, {
        url: opp.applyLink,
      });
    }

    yPos += 62;
  });

  // FOOTER (on every page)
  const totalPages = doc.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Footer line
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    // Footer text left
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("KaarYab Afghanistan", margin, pageHeight - 10);

    // Footer text center
    doc.text(
      "Find opportunities. Build your future.",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );

    // Page number right
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: "right" },
    );
  }

  // Save PDF
  const fileName = `KaarYab-Saved-Opportunities-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);

  return fileName;
}
