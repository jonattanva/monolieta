import Textarea from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Textarea/>", () => {
    it("should render", () => {
        render(<Textarea />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
        render(<Textarea placeholder="My placeholder" />);
        expect(screen.getByPlaceholderText("My placeholder")).toBeDefined();
    });

    it("should render with test", () => {
        render(<Textarea test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });

    it("should render with change", async () => {
        const change = vi.fn();
        render(<Textarea change={change} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {
            target: {
                value: "comple",
            },
        });

        fireEvent.change(input, {
            target: {
                value: "complete",
            },
        });

        await waitFor(
            () => {
                expect(change).toHaveBeenCalledTimes(1);
            },
            { timeout: 1000 }
        );
    });
});
