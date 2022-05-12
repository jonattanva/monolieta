import Text from "./index";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
