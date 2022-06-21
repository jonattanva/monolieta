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

    function onSelect(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        const target = event.target as HTMLLIElement;
        const value = target.dataset.value;

        const current = selected.find((option) => {
            return option.value === value;
        });

        if (!current) {
            setSelected((previous) => {
                const current = props.options?.find((option) => {
                    return option.value === value;
                });

                if (current) {
                    return [...previous, current];
                }

                return previous;
            });
        }
    }

    return (
        <div ref={containerRef}>
            <div>
                {selected.map((row) => (
                    <div key={row.value}>{row.label}</div>
                ))}

                <div className={classes.container} onClick={toggle}>
                    <input
                        className={classes.input}
                        aria-autocomplete="list"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        onChange={onChange}
                        placeholder={placeholder}
                        spellCheck="false"
                        type="text"
                    />
                </div>
            </div>

            {is && (
                <div>
                    <ul>
                        {dataset?.length === 0 && <li>No options</li>}

                        {dataset?.map((option) => (
                            <li
                                key={option.value}
                                className={classes.item}
                                data-value={option.value}
                                onClick={onSelect}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function Input() {
    return (
        <div className={classes.container} onClick={toggle}>
            <input
                className={classes.input}
                aria-autocomplete="list"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                onChange={onChange}
                placeholder={placeholder}
                spellCheck="false"
                type="text"
            />
        </div>
    );
}
