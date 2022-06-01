import Author from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Author/>", () => {
    it("should render", () => {
        render(<Author name="Jonattan" project="Hello" privacy="public" />);
        expect(screen.getByText("Jonattan")).toBeInTheDocument();
        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("public")).toBeInTheDocument();
    });

    it("should render with refresh handler", () => {
        const fn = vi.fn();
        render(
            <Author
                name="Jonattan"
                project="Hello"
                privacy="public"
                refresh={fn}
            />
        );

        const action = screen.getByText("Hello");
        fireEvent.click(action);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should render with home handler", () => {
        const fn = vi.fn();
        render(
            <Author
                name="Jonattan"
                project="Hello"
                privacy="public"
                home={fn}
            />
        );

        const action = screen.getByText("Jonattan");
        fireEvent.click(action);

        expect(fn).toHaveBeenCalledTimes(1);
    });
});
