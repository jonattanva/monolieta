import Warning from "../resources/warning";
import classes from "./index.module.css";
import { useRef, useState } from "react";

type PropTypes = {
    autofocus?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    delay?: number;
    error?: string;
    name?: string;
    placeholder?: string;
    test?: string;
    value?: string;
};

export default function Text(props: PropTypes) {
    return (
        <div className={classes.main}>
            <Input {...props} />
            {props.error && (
                <div className={classes.error}>
                    <div className={classes.icon}>
                        <Warning width={20} height={20} />
                    </div>
                    <small>{props.error}</small>
                </div>
            )}
        </div>
    );
}

function Input(props: PropTypes) {
    // prettier-ignore
    const {
        autofocus = false,
        delay = 500,
        value = ""
    } = props;

    const timeoutRef = useRef<NodeJS.Timeout>();
    const [internal, setInternal] = useState(value);

    function change(event: React.ChangeEvent<HTMLInputElement>) {
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
        <input
            autoFocus={autofocus}
            className={!props.error ? classes.input : classes.input_error}
            data-testid={props.test}
            name={props.name}
            onChange={change}
            placeholder={props.placeholder}
            type="text"
            value={internal}
        />
    );
}
