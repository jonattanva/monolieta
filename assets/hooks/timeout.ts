import { useRef, useEffect } from "react";

export default (callback: () => void, delay: number | null) => {
    const ref = useRef<(() => void) | null>(null);

    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    useEffect(() => {
        const run = () => {
            if (ref.current) {
                ref.current();
            }
        };

        if (delay !== null) {
            const id = setTimeout(run, delay);
            return () => {
                clearTimeout(id);
            };
        }
    }, [delay]);
};
