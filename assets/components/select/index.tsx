import Icon from "../resources/x";
import classes from "./index.module.css";
import useEscape from "../../hooks/escape";
import useOutside from "../../hooks/outside";
import useVisible from "../../hooks/visible";
import { Search } from "monolieta-search";
import { useEffect, useState, useRef } from "react";

const client = new Search({
    caseSensitive: false,
    exactWordStrategy: false,
    ignoreAccent: true,
});

type Option = {
    label: string;
    value: string;
};

type PropTypes = {
    delay?: number;
    multiple?: boolean;
    options?: Option[];
    placeholder?: string;
};

type InternalInput = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    onRemove: (option: Option) => void;
    options: Option[];
    placeholder?: string;
};

type InternalSelected = {
    onClick: (option: Option) => void;
    option: Option;
};

type InternalList = {
    onClick: (option: Option) => void;
    options?: Option[];
    selected?: Option[];
};

type InternalItem = {
    onClick: (option: Option) => void;
    option: Option;
    selected?: Option[];
};

export default function Select(props: PropTypes) {
    return (
        <div className={classes.main}>
            <Body {...props} />
        </div>
    );
}

function Body(props: PropTypes) {
    // prettier-ignore
    const {
        delay = 500,
        multiple = true,
        placeholder = "Select..."
    } = props;

    const timeoutRef = useRef<NodeJS.Timeout>();
    const containerRef = useRef<HTMLDivElement>(null);

    const { is, show, hide, toggle } = useVisible();

    const [dataset, setDataset] = useState<Option[]>();
    const [selected, setSelected] = useState<Option[]>([]);

    useEscape(hide);
    useOutside([containerRef], hide);

    useEffect(() => {
        setDataset(props.options);
        props.options?.forEach((option) => {
            client.index(option.value, option.label);
        });
    }, [props.options]);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        show();

        timeoutRef.current = setTimeout(() => {
            const query = event.target.value;
            if (!query) {
                setDataset(props.options);
                return;
            }

            const current = [];
            const results = client.search(query);

            for (let i = 0; i < results.length; i++) {
                const total = props.options?.length || 0;

                for (let k = 0; k < total; k++) {
                    const row = props.options![k];
                    if (results[i] === row.value) {
                        current.push(row);
                        break;
                    }
                }
            }

            setDataset(current);
        }, delay);
    }

    function onSelect(option: Option) {
        const current = selected.find((self) => {
            return self.value === option.value;
        });

        if (!current) {
            setSelected((previous) => {
                const current = props.options?.find((self) => {
                    return self.value === option.value;
                });

                if (current) {
                    return [...previous, current];
                }

                return previous;
            });
        }
    }

    function onRemove(option: Option) {
        setSelected((previous) => {
            return previous.filter((selected) => {
                return selected.value !== option.value;
            });
        });
    }

    return (
        <div ref={containerRef}>
            <Input
                onChange={onChange}
                onClick={toggle}
                placeholder={placeholder}
                options={selected}
                onRemove={onRemove}
            />

            {is && <List options={dataset} onClick={onSelect} />}
        </div>
    );
}

function Input(props: InternalInput) {
    return (
        <div className={classes.container} onClick={props.onClick}>
            {props.options?.map((option) => (
                <Selected
                    key={option.value}
                    onClick={props.onRemove}
                    option={option}
                />
            ))}

            <input
                className={classes.input}
                aria-autocomplete="list"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                onChange={props.onChange}
                placeholder={props.placeholder}
                spellCheck="false"
                type="text"
            />
        </div>
    );
}

function Selected(props: InternalSelected) {
    function onClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (props.onClick) {
            props.onClick(props.option);
        }

        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div className={classes.tag}>
            <div>{props.option.label}</div>
            <div className={classes.icon} onClick={onClick}>
                <Icon width={14} height={14} />
            </div>
        </div>
    );
}

function List(props: InternalList) {
    return (
        <div className={classes.list}>
            {props.options?.length === 0 && <li>No options</li>}
            {props.options?.map((option) => (
                <Item
                    key={option.value}
                    onClick={props.onClick}
                    option={option}
                    selected={props.selected}
                />
            ))}
        </div>
    );
}

function Item(props: InternalItem) {
    function onClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (props.onClick) {
            props.onClick(props.option);
        }

        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div className={classes.item} onClick={onClick}>
            {props.option.label}
        </div>
    );
}
