import Snackbar from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Snackbar />", () => {
    it("should render", () => {
        render(<Snackbar message="message" />);
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should render with data test", () => {
        render(<Snackbar message="message" test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });

    it("should render with timeout", async () => {
        const fn = vi.fn();
        render(<Snackbar message="message" close={fn} delay={400} />);

        await waitFor(
            () => {
                expect(fn).toHaveBeenCalledTimes(1);
            },
            { timeout: 1000 }
        );
    });

    it("should render with dismiss button", async () => {
        const fn = vi.fn();
        render(<Snackbar message="message" close={fn} />);

        const input = screen.getByRole("button");
        fireEvent.click(input);

        await waitFor(
            () => {
                expect(fn).toHaveBeenCalledTimes(1);
            },
            { timeout: 1000 }
        );
    });
});
