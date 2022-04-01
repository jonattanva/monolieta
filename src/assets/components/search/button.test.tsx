import Search from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Search />", () => {
    it("should render", () => {
        render(<Search />);
        expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
        render(<Search placeholder="My placeholder" />);
        expect(screen.getByPlaceholderText("My placeholder")).toBeDefined();
    });

    it("should render with on change", async () => {
        const search = vi.fn();
        render(<Search search={search} delay={200} />);

        const input = screen.getByRole("searchbox");
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
                expect(search).toHaveBeenCalledTimes(1);
            },
            { timeout: 500 }
        );
    });

    it("should render with test", () => {
        render(<Search test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });
});
