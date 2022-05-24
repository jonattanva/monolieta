import Home from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Home />", () => {
    it("should render", () => {
        render(<Home />);
        expect(screen.getByText("Project")).toBeInTheDocument();
    });

    it("should render with new project button", () => {
        const fn = vi.fn();
        render(<Home onNewProject={fn} />);

        const button = screen.getByText("New project");
        fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });
});
