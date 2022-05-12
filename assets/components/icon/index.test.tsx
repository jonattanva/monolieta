import Icon from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("<Icon />", () => {
    it("should render with data test", () => {
        render(<Icon test="test" />);
        expect(screen.getByTestId("test")).toBeInTheDocument();
    });
});
