import Information from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Information/>", () => {
    it("should render", () => {
        render(<Information author="Jonattan" project="Hello" privacy="Public" />);
        expect(screen.getByText("Jonattan")).toBeInTheDocument();
        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Public")).toBeInTheDocument();
    });

    it("should render with back handler", () => {
        const fn = vi.fn();
        render(
            <Information
                author="Jonattan"
                project="Hello"
                privacy="Public"
                back={fn}
            />
        );

        const action = screen.getByText("Jonattan");
        fireEvent.click(action);

        expect(fn).toHaveBeenCalledTimes(1);
    });
});
