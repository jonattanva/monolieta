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

    it("click", () => {
        const click = vi.fn();
        render(<Button click={click} text="General" />);

        const input = screen.getByRole("button");
        fireEvent.click(input);

        expect(click).toHaveBeenCalledTimes(1);
    });
});
