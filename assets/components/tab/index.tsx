import classes from "./index.module.css";
import { useState } from "react";

type Body = {
    selected: number;
};

type PropTypes = {
    click?: (index: number) => void;
    options?: string[];
    render?: React.ComponentType<Body>;
    selected?: number;
    test?: string;
};

export default function Tab(props: PropTypes) {
    return (
        <div role="tablist" data-testid={props.test}>
            <Body {...props} />
        </div>
    );
}

function Body(props: PropTypes) {
    const { render: View } = props;
    const [selected, setSelected] = useState(props.selected || 0);

    const onClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setSelected((previous) => {
            const target = event.target as HTMLButtonElement;
            const item = Number(target.dataset.item);
            if (props.click && item !== previous) {
                props.click(item);
            }
            return item;
        });
    };

    return (
        <>
            <div className={classes.tab}>
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
            </div>
            {View && <View selected={selected} />}
        </>
    );
}
