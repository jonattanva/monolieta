import Form from "./form";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Form />", () => {
    it("should render", () => {
        render(<Form />);
        expect(screen.getByText("Create a new project")).toBeInTheDocument();
    });

    it("should render with error message", () => {
        const submit = vi.fn();
        render(<Form submit={submit} />);

        const action = screen.getByRole("button");
        fireEvent.click(action);

        expect(
            screen.getByText("The project name is required.")
        ).toBeInTheDocument();

        expect(submit).toHaveBeenCalledTimes(0);
    });

    it("should render with submit", async () => {
        const submit = vi.fn();
        render(<Form submit={submit} />);

        const inputs = screen.getAllByRole("textbox");
        fireEvent.change(inputs[0], {
            target: {
                value: "Demo",
            },
        });

        fireEvent.change(inputs[1], {
            target: {
                value: "The demo project",
            },
        });

        await waitFor(
            () => {
                const action = screen.getByRole("button");
                fireEvent.click(action);

                expect(submit).toHaveBeenCalledTimes(1);
            },
            { timeout: 2000 }
        );
    });
});
