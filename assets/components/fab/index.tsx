import classes from "./index.module.css";

type PropTypes = {
    children?: React.ReactNode;
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | Promise<void>;
    test?: string;
};

export default function Fab(props: PropTypes) {
    return (
        <button
            className={classes.main}
            onClick={props.onClick}
            data-testid={props.test}
        >
            {props.children}
        </button>
    );
}
