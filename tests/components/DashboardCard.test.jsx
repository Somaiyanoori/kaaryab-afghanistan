import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Briefcase } from "lucide-react";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard.jsx";

describe("DashboardStatCard", () => {
  const defaultProps = {
    label: "Total Jobs",
    value: 42,
    icon: Briefcase,
    gradient: "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
    index: 0,
  };

  it("should render the label correctly", () => {
    render(<DashboardStatCard {...defaultProps} />);
    expect(screen.getByText("Total Jobs")).toBeInTheDocument();
  });

  it("should render the value correctly", () => {
    render(<DashboardStatCard {...defaultProps} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should render with different values", () => {
    render(<DashboardStatCard {...defaultProps} value={100} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("should render with zero value", () => {
    render(<DashboardStatCard {...defaultProps} value={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render with different labels", () => {
    render(<DashboardStatCard {...defaultProps} label="Scholarships" />);
    expect(screen.getByText("Scholarships")).toBeInTheDocument();
  });

  it("should render trend indicator when trend is provided", () => {
    render(
      <DashboardStatCard {...defaultProps} trend="up" trendValue="+12%" />,
    );
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("should not render trend when not provided", () => {
    render(<DashboardStatCard {...defaultProps} />);
    expect(screen.queryByText("+12%")).not.toBeInTheDocument();
  });

  it("should render an icon", () => {
    const { container } = render(<DashboardStatCard {...defaultProps} />);
    // Icon should be an SVG element
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
