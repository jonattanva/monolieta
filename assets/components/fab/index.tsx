import classes from "./index.module.css";

type PropTypes = {
    children?: React.ReactNode;
    click?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | Promise<void>;
    test?: string;
};

export default function Fab(props: PropTypes) {
    return (
        <button
            className={classes.main}
            onClick={props.click}
            data-testid={props.test}
        >
            {props.children}
        </button>
    );
}
