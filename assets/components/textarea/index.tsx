import { useRef, useState } from "react";
import classes from "./index.module.css";

type PropTypes = {
    autofocus?: boolean;
    delay?: number;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    placeholder?: string;
    test?: string;
    value?: string;
};

export default function Textarea(props: PropTypes) {
    // prettier-ignore
    const {
        autofocus = false,
        delay = 500,
        value = ""
    } = props;

    const timeoutRef = useRef<NodeJS.Timeout>();
    const [internal, setInternal] = useState(value);

    function change(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInternal(event.target.value);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (props.onChange) {
                props.onChange(event);
            }
        }, delay);
    }

    return (
        <textarea
            autoFocus={autofocus}
            className={classes.main}
            data-testid={props.test}
            name={props.name}
            onChange={change}
            placeholder={props.placeholder}
            value={internal}
        />
    );
}
