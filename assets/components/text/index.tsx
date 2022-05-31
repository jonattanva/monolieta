import classes from "./index.module.css";
import { useRef, useState } from "react";

type PropTypes = {
    autofocus?: boolean;
    change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
                    <Icon />
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
            if (props.change) {
                props.change(event);
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

function Icon() {
    return (
        <div className={classes.icon}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={20}
                height={20}
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </div>
    );
}
