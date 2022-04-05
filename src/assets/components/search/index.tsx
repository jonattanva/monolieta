import { useRef } from "react";
import Icon from "../icon/search";
import classes from "./index.module.css";

export type PropTypes = {
    autofocus?: boolean;
    delay?: number;
    search?: (criteria: string) => void | Promise<void>;
    placeholder?: string;
    test?: string;
};

export default function Search(props: PropTypes) {
    return (
        <div>
            <div className={classes.icon}>
                <Icon width={14} height={14} />
            </div>
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

    const timeoutRef = useRef<number>();

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
