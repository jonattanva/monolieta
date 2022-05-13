import Text from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Text/>", () => {
    it("should render", () => {
        render(<Text />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
        render(<Text placeholder="My placeholder" />);
        expect(screen.getByPlaceholderText("My placeholder")).toBeDefined();
    });

    it("should render with test", () => {
        render(<Text test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });

    it("should render with change", async () => {
        const change = vi.fn();
        render(<Text change={change} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {
            target: {
                value: "temporal",
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
