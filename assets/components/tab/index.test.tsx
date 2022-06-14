import Tab from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Tab />", () => {
    it("should render", () => {
        render(<Tab options={["One", "Two"]} />);
        expect(screen.getByText("One")).toBeInTheDocument();
        expect(screen.getByText("Two")).toBeInTheDocument();
    });

    it("should render with selected option", () => {
        render(<Tab options={["One", "Two"]} selected={1} />);
        expect(screen.getByText("One")).toBeInTheDocument();
        expect(screen.getByText("Two")).toBeInTheDocument();

        expect(screen.getByText("Two")).toHaveAttribute(
            "data-selected",
            "true"
        );
    });

    it("should render with click handler", () => {
        const fn = vi.fn();
        render(<Tab options={["One", "Two"]} onClick={fn} />);

        fireEvent.click(screen.getByText("Two"));

        expect(fn).toHaveBeenCalledTimes(1);

        expect(screen.getByText("Two")).toHaveAttribute(
            "data-selected",
            "true"
        );
    });

    it("should render with multiple click handler", () => {
        const fn = vi.fn();
        render(<Tab options={["One", "Two"]} onClick={fn} />);

        fireEvent.click(screen.getByText("Two"));

        expect(fn).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Two")).toHaveAttribute(
            "data-selected",
            "true"
        );

        fireEvent.click(screen.getByText("One"));

        expect(fn).toHaveBeenCalledTimes(2);
        expect(screen.getByText("One")).toHaveAttribute(
            "data-selected",
            "true"
        );
    });

    it("should render with body", () => {
        const fn = vi.fn();
        render(<Tab options={["One", "Two"]} onClick={fn} render={Fake} />);
        expect(screen.getByText("0")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Two"));

        expect(fn).toHaveBeenCalledTimes(1);
        expect(screen.getByText("1")).toBeInTheDocument();
    });
});

function Fake(props: { selected: number }) {
    return <div>{props.selected}</div>;
}
