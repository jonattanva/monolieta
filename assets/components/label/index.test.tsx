import Label from "./index";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("<Label/>", () => {
    it("should render", () => {
        render(<Label title="Person" />);

        expect(screen.getByText("Person")).toBeInTheDocument();
    });

    it("should render children", () => {
        render(
            <Label title="Person">
                <div>Hello</div>
            </Label>
        );

        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
