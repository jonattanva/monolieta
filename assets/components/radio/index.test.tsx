import Radio from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Radio />", () => {
    it("should render", () => {
        render(<Radio />);
        expect(screen.getByRole("radio")).toBeInTheDocument();
    });

    it("should render with test", () => {
        render(<Radio test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });

    it("should render with change", () => {
        const click = vi.fn();
        render(<Radio onClick={click} />);

        const input = screen.getByRole("radio");
        fireEvent.click(input);

        expect(click).toHaveBeenCalledTimes(1);
    });
});
