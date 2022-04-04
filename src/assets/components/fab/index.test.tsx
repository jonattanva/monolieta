import Fab from "./index";
import { describe, it, vi } from "vitest";
import source from "../../images/search.svg";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Fab />", () => {
    it("should render", () => {
        render(<Fab />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with icon and click handler", () => {
        const click = vi.fn();
        render(<Fab icon={source} click={click} />);
        fireEvent.click(screen.getByRole("button"));
        expect(click).toHaveBeenCalledTimes(1);
    });

    it("should render with icon and data test", () => {
        render(<Fab icon={source} test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });
});
