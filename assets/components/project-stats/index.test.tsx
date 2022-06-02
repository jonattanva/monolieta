import Stats from "./index";
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

describe("<Stats/>", () => {
    it("should render", () => {
        render(<Stats />);
        expect(screen.getByText("0 Files")).toBeInTheDocument();
        expect(screen.getByText("0 bytes Storage")).toBeInTheDocument();
    });

    it("should render with files", () => {
        render(<Stats files={10} />);
        expect(screen.getByText("10 Files")).toBeInTheDocument();
    });

    it("should render with files (K)", () => {
        render(<Stats files={10000} />);
        expect(screen.getByText("10K Files")).toBeInTheDocument();
    });

    it("should render with files (M)", () => {
        render(<Stats files={1000000} />);
        expect(screen.getByText("1M Files")).toBeInTheDocument();
    });

    it("should render with storage (bytes)", () => {
        render(<Stats storage={10} />);
        expect(screen.getByText("10 bytes Storage")).toBeInTheDocument();
    });

    it("should render with storage (KB)", () => {
        render(<Stats storage={130000} />);
        expect(screen.getByText("127.0 KB Storage")).toBeInTheDocument();
    });

    it("should render with storage (MB)", () => {
        render(<Stats storage={13000000} />);
        expect(screen.getByText("12.4 MB Storage")).toBeInTheDocument();
    });

    it("should render with storage (GB)", () => {
        render(<Stats storage={1300000430} />);
        expect(screen.getByText("1.2 GB Storage")).toBeInTheDocument();
    });

    it("should render with storage (TB)", () => {
        render(<Stats storage={13000212144502} />);
        expect(screen.getByText("11.8 TB Storage")).toBeInTheDocument();
    });
});
