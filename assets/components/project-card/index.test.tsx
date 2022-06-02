import Card from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Card/>", () => {
    it("should render with name", () => {
        render(<Card name="MNIST" />);
        expect(screen.getByText("MNIST")).toBeInTheDocument();
    });

    it("should render with description", () => {
        render(<Card description="The database MNIST..." />);
        expect(screen.getByText("The database MNIST...")).toBeInTheDocument();
    });

    it("should render with owner", () => {
        render(<Card owner="John Doe" />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should render with privacy", () => {
        render(<Card privacy="Private" />);
        expect(screen.getByText("Private")).toBeInTheDocument();
    });

    it("should render with total", () => {
        render(<Card total={30} />);
        expect(screen.getByText("30 items")).toBeInTheDocument();
    });

    it("should render with click", () => {
        const click = vi.fn();
        render(<Card click={click} />);

        fireEvent.click(screen.getByRole("row"));
        expect(click).toHaveBeenCalledTimes(1);
    });
});
