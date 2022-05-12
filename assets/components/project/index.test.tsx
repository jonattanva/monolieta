import Project from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Project/>", () => {
    it("should render with name", () => {
        render(<Project name="MNIST" />);
        expect(screen.getByText("MNIST")).toBeInTheDocument();
    });

    it("should render with description", () => {
        render(<Project description="The database MNIST..." />);
        expect(screen.getByText("The database MNIST...")).toBeInTheDocument();
    });

    it("should render with owner", () => {
        render(<Project owner="John Doe" />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should render with visibility", () => {
        render(<Project visibility="Private" />);
        expect(screen.getByText("Private")).toBeInTheDocument();
    });

    it("should render with total", () => {
        render(<Project total={30} />);
        expect(screen.getByText("30 items")).toBeInTheDocument();
    });

    it("should render with click", () => {
        const click = vi.fn();
        render(<Project click={click} />);

        fireEvent.click(screen.getByRole("row"));
        expect(click).toHaveBeenCalledTimes(1);
    });
});
