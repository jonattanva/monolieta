import Picture from "./index";
import { describe, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

describe("<Picture/>", () => {
    it("should render with click", () => {
        const click = vi.fn();
        render(
            <Picture
                alt="picture"
                onClick={click}
                test="picture"
                source="https://picsum.photos/200/300"
            />
        );

        fireEvent.click(screen.getByTestId("picture"));
        expect(click).toHaveBeenCalledTimes(1);
    });

    it.skip("should render with natural size", async () => {
        const onNaturalSize = vi.fn();
        render(
            <Picture
                alt="picture"
                onNaturalSize={onNaturalSize}
                test="picture"
                source="https://picsum.photos/200/300"
            />
        );

        await waitFor(
            () => {
                expect(onNaturalSize).toHaveBeenCalledTimes(1);
            },
            { timeout: 5000 }
        );
    });
});
