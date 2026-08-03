import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpportunityCard from "../../components/opportunities/OpportunityCard.jsx";

// Sample opportunity data for testing
const mockOpportunity = {
  id: "1",
  slug: "frontend-developer",
  title: "Frontend Developer",
  organization: "Kabul Tech",
  category: "Job",
  location: "Kabul",
  type: "Remote",
  deadline: "2027-12-31",
  shortDesc: "Great frontend opportunity",
  description: "Full description here",
  tags: ["React", "JavaScript"],
  featured: false,
  urgent: false,
  verified: false,
  postedDate: "2025-01-01",
  requirements: ["React knowledge"],
};

describe("OpportunityCard", () => {
  it("should render the title", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  });

  it("should render the organization", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.getByText("Kabul Tech")).toBeInTheDocument();
  });

  it("should render the location", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.getByText("Kabul")).toBeInTheDocument();
  });

  it("should render the work type", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    // "Remote" should appear (may appear multiple times)
    const remoteElements = screen.getAllByText("Remote");
    expect(remoteElements.length).toBeGreaterThan(0);
  });

  it("should render the short description", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.getByText("Great frontend opportunity")).toBeInTheDocument();
  });

  it("should render the category badge", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.getByText("Job")).toBeInTheDocument();
  });

  it("should show FEATURED badge when featured is true", () => {
    const featured = { ...mockOpportunity, featured: true };
    render(<OpportunityCard opportunity={featured} index={0} />);
    expect(screen.getByText("FEATURED")).toBeInTheDocument();
  });

  it("should NOT show FEATURED badge when featured is false", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    expect(screen.queryByText("FEATURED")).not.toBeInTheDocument();
  });

  it("should show URGENT badge when urgent is true", () => {
    const urgent = { ...mockOpportunity, urgent: true };
    render(<OpportunityCard opportunity={urgent} index={0} />);
    expect(screen.getByText("URGENT")).toBeInTheDocument();
  });

  it("should render as a link", () => {
    const { container } = render(
      <OpportunityCard opportunity={mockOpportunity} index={0} />,
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toContain("frontend-developer");
  });

  it("should render organization initials in avatar", () => {
    render(<OpportunityCard opportunity={mockOpportunity} index={0} />);
    // "Kabul Tech" → "KT" initials
    expect(screen.getByText("KT")).toBeInTheDocument();
  });

  it("should use description if shortDesc is not provided", () => {
    const noShortDesc = { ...mockOpportunity, shortDesc: null };
    render(<OpportunityCard opportunity={noShortDesc} index={0} />);
    expect(screen.getByText("Full description here")).toBeInTheDocument();
  });
});
