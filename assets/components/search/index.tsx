import classes from "./index.module.css";
import { useRef } from "react";

export type PropTypes = {
    autofocus?: boolean;
    delay?: number;
    placeholder?: string;
    search?: (criteria: string) => void | Promise<void>;
    test?: string;
};

export default function Search(props: PropTypes) {
    return (
        <div>
            <Icon />
            <Input {...props} />
        </div>
    );
}

function Input(props: PropTypes) {
    const {
        autofocus = false,
        delay = 500,
        search,
        placeholder = "Search",
    } = props;

    const timeoutRef = useRef<NodeJS.Timeout>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (search) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                search(event.target.value);
            }, delay);
        }
    };

    return (
        <input
            className={classes.input}
            autoComplete="off"
            autoFocus={autofocus}
            data-testid={props.test}
            onChange={onChange}
            placeholder={placeholder}
            type="search"
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
                strokeWidth={2}
                width={14}
                height={14}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
}
