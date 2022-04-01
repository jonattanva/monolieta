import Button from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Button />", () => {
    it("should render", () => {
        render(<Button />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with text", () => {
        render(<Button text="Hello" />);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("should render with text and click handler", () => {
        const click = vi.fn();
        render(<Button text="Hello" click={click} />);
        fireEvent.click(screen.getByRole("button"));
        expect(click).toHaveBeenCalledTimes(1);
    });

    it("should render with data test", () => {
        render(<Button text="Hello" test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });
});
