import { useState } from "react";

export default function Visible(initial: boolean = false) {
    const [value, setValue] = useState(initial);

    const show = () => setValue(true);
    const hide = () => setValue(false);
    const toggle = () => setValue((previous) => !previous);

    return {
        hide,
        is: value,
        show,
        toggle,
    };
}
