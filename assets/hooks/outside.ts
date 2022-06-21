import { useEffect } from "react";

export default function Outside(
    ref: React.MutableRefObject<HTMLElement | SVGElement | null>[],
    handler: (event: MouseEvent) => void
) {
    useEffect(() => {
        const contains = (target: HTMLElement | null) => {
            return ref.find(({ current }) => {
                return current && current.contains(target);
            });
        };

        const listener = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (contains(target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
}
