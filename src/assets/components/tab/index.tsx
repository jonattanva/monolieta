import classes from "./index.module.css";
import { Fragment, useState } from "react";

type PropTypes = {
    click?: (index: number) => void;
    options?: string[];
    selected?: number;
    test?: string;
};

export default function Tab(props: PropTypes) {
    return (
        <div className={classes.main} role="tablist" data-testid={props.test}>
            <Body {...props} />
        </div>
    );
}

function Body(props: PropTypes) {
    const [selected, setSelected] = useState(props.selected || 0);

    const onClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setSelected((previous) => {
            const item = Number(event.currentTarget.dataset.item);
            if (props.click && item !== previous) {
                props.click(item);
            }
            return item;
        });
    };

    return (
        <Fragment>
            {props.options?.map((option, index) => (
                <button
                    className={classes.item}
                    data-item={index}
                    data-selected={index === selected}
                    key={index}
                    onClick={onClick}
                    role="tab"
                >
                    {option}
                </button>
            ))}
        </Fragment>
    );
}
