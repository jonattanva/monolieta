import Icon from "../icon";
import { useRef } from "react";
import classes from "./index.module.css";
import search from "../../images/search.svg";

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
            <div className={classes.icon}>
                <Icon width={14} height={14} source={search} hash="search" />
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
