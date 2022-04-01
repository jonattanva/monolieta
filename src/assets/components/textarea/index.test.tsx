import Textarea from "./index";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
