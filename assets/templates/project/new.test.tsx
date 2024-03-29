import New from "./new";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<New />", () => {
    it("should render", () => {
        render(<New />);
        expect(screen.getByText("Create a new project")).toBeInTheDocument();
    });

    it("should render with error message", () => {
        const submit = vi.fn();
        render(<New onSubmit={submit} />);

        const action = screen.getByRole("button");
        fireEvent.click(action);

        expect(
            screen.getByText("The project name is required.")
        ).toBeInTheDocument();

        expect(submit).toHaveBeenCalledTimes(0);
    });

    it("should render with submit", async () => {
        const fn = vi.fn();
        render(<New onSubmit={fn} />);

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

                expect(fn).toHaveBeenCalledTimes(1);
            },
            { timeout: 2000 }
        );
    });
});
