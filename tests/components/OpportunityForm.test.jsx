import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Select from "../../components/ui/Select.jsx";

// Test the reusable form components
describe("Form Components", () => {
  // INPUT COMPONENT TESTS
  describe("Input", () => {
    it("should render with label", () => {
      render(<Input label="Full Name" name="name" />);
      expect(screen.getByText("Full Name")).toBeInTheDocument();
    });

    it("should show required indicator when required", () => {
      render(<Input label="Email" name="email" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should NOT show required indicator when not required", () => {
      render(<Input label="Name" name="name" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("should render placeholder", () => {
      render(
        <Input label="Email" name="email" placeholder="you@example.com" />,
      );
      expect(
        screen.getByPlaceholderText("you@example.com"),
      ).toBeInTheDocument();
    });

    it("should render with email type", () => {
      render(<Input label="Email" name="email" type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should render date input with correct type", () => {
      const { container } = render(
        <Input label="Date" name="date" type="date" />,
      );
      // Find input by type attribute since date inputs don't have textbox role
      const dateInput = container.querySelector('input[type="date"]');
      expect(dateInput).toBeInTheDocument();
    });

    it("should show error message", () => {
      render(
        <Input
          label="Name"
          name="name"
          error={{ message: "Name is required" }}
        />,
      );
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("should show helper text when no error", () => {
      render(
        <Input
          label="Password"
          name="password"
          helper="Must be 8 characters"
        />,
      );
      expect(screen.getByText("Must be 8 characters")).toBeInTheDocument();
    });

    it("should NOT show helper text when there is error", () => {
      render(
        <Input
          label="Password"
          name="password"
          helper="Helper text"
          error={{ message: "Error message" }}
        />,
      );
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<Input label="Email" name="email" disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });
  });

  // TEXTAREA COMPONENT TESTS
  describe("Textarea", () => {
    it("should render with label", () => {
      render(<Textarea label="Description" name="desc" onChange={() => {}} />);
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("should show character counter when maxLength is set", () => {
      render(
        <Textarea
          label="Bio"
          name="bio"
          value="Hello"
          onChange={() => {}}
          maxLength={100}
        />,
      );
      expect(screen.getByText("5/100")).toBeInTheDocument();
    });

    it("should update character counter as value changes", () => {
      const { rerender } = render(
        <Textarea
          label="Bio"
          name="bio"
          value="Hi"
          onChange={() => {}}
          maxLength={100}
        />,
      );
      expect(screen.getByText("2/100")).toBeInTheDocument();

      rerender(
        <Textarea
          label="Bio"
          name="bio"
          value="Hello World"
          onChange={() => {}}
          maxLength={100}
        />,
      );
      expect(screen.getByText("11/100")).toBeInTheDocument();
    });

    it("should render with correct number of rows", () => {
      render(<Textarea label="Bio" name="bio" rows={6} onChange={() => {}} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "6");
    });

    it("should show required indicator", () => {
      render(
        <Textarea
          label="Description"
          name="desc"
          required
          onChange={() => {}}
        />,
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  // SELECT COMPONENT TESTS
  describe("Select", () => {
    const options = [
      { value: "job", label: "Job" },
      { value: "internship", label: "Internship" },
      { value: "scholarship", label: "Scholarship" },
    ];

    it("should render with label", () => {
      render(<Select label="Category" name="category" options={options} />);
      expect(screen.getByText("Category")).toBeInTheDocument();
    });

    it("should render all options", () => {
      render(<Select label="Category" name="category" options={options} />);
      expect(screen.getByText("Job")).toBeInTheDocument();
      expect(screen.getByText("Internship")).toBeInTheDocument();
      expect(screen.getByText("Scholarship")).toBeInTheDocument();
    });

    it("should render with placeholder option", () => {
      render(
        <Select
          label="Category"
          name="category"
          options={options}
          placeholder="Select category"
        />,
      );
      expect(screen.getByText("Select category")).toBeInTheDocument();
    });

    it("should handle string options", () => {
      const stringOptions = ["Small", "Medium", "Large"];
      render(<Select label="Size" name="size" options={stringOptions} />);
      expect(screen.getByText("Small")).toBeInTheDocument();
      expect(screen.getByText("Medium")).toBeInTheDocument();
      expect(screen.getByText("Large")).toBeInTheDocument();
    });

    it("should show required indicator", () => {
      render(<Select label="Type" name="type" options={options} required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("should show error message", () => {
      render(
        <Select
          label="Type"
          name="type"
          options={options}
          error={{ message: "Please select a type" }}
        />,
      );
      expect(screen.getByText("Please select a type")).toBeInTheDocument();
    });
  });
});
