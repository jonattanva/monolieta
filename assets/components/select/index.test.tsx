import Select from "./index";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("<Select/>", () => {
    it("should render with placeholder", () => {
        render(<Select placeholder="My placeholder" />);
        expect(screen.getByPlaceholderText("My placeholder")).toBeDefined();
    });
});
