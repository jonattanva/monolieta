import Icon from "../resources/search";
import classes from "./index.module.css";
import { useRef } from "react";

export type PropTypes = {
    autofocus?: boolean;
    delay?: number;
    placeholder?: string;
    onSearch?: (criteria: string) => void | Promise<void>;
    test?: string;
};

export default function Search(props: PropTypes) {
    return (
        <div>
            <div className={classes.icon}>
                <Icon height={14} width={14} />
            </div>
            <Input {...props} />
        </div>
    );
}

function Input(props: PropTypes) {
    const {
        autofocus = false,
        delay = 500,
        onSearch,
        placeholder = "Search",
    } = props;

    const timeoutRef = useRef<NodeJS.Timeout>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onSearch(event.target.value);
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
