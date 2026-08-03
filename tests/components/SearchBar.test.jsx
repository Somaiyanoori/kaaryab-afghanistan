import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchInput from "../../components/opportunities/SearchInput.jsx";

describe("SearchInput", () => {
  it("should render the input with placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
  });

  it("should render with custom placeholder", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Find opportunities..."
      />,
    );
    expect(
      screen.getByPlaceholderText("Find opportunities..."),
    ).toBeInTheDocument();
  });

  it("should display the value prop", () => {
    render(<SearchInput value="React" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("React");
  });

  it("should update value using fireEvent", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox");

    // Use fireEvent for controlled input testing
    fireEvent.change(input, { target: { value: "developer" } });
    expect(input.value).toBe("developer");
  });

  it("should show clear button when there is text", async () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByRole("textbox");

    // Type using fireEvent
    fireEvent.change(input, { target: { value: "test" } });

    // Wait for clear button to appear
    await waitFor(() => {
      const clearButton = screen.getByLabelText("Clear search");
      expect(clearButton).toBeInTheDocument();
    });
  });

  it("should NOT show clear button when input is empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("should call onChange after debounce delay", async () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });

    // Wait for debounce (300ms + buffer)
    await waitFor(
      () => {
        expect(handleChange).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });

  it("should clear input when clear button is clicked", async () => {
    render(<SearchInput value="hello" onChange={() => {}} />);

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("");
  });

  it("should have search icon", () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
