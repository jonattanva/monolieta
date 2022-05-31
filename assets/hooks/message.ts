import { useState } from "react";

export default function Message(initial: string = "") {
    const [value, setValue] = useState(initial);

    const is = value !== "";
    const showMessage = (message: string) => setValue(message);
    const onClose = () => setValue("");

    return [
        is,
        showMessage,
        {
            message: value,
            close: onClose,
        },
    ] as const;
}
