import { useEffect } from "react";

export default function Escape(handler: (event: KeyboardEvent) => void) {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handler(event);
            }
        };

        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);
}
