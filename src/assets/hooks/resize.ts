import { useEffect, useState } from "react";

export default function Resize(ref: React.RefObject<HTMLElement>) {
    const [value, setValue] = useState({
        width: getValue(ref.current?.offsetWidth),
        height: getValue(ref.current?.offsetHeight),
    });

    useEffect(() => {
        function onResize() {
            setValue({
                width: getValue(ref.current?.offsetWidth),
                height: getValue(ref.current?.offsetHeight),
            });
        }

        window.addEventListener("resize", onResize);
        return function onDestroy() {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return value;
}

const getValue = (value?: number, defaultValue: number = 0) =>
    value || defaultValue;
