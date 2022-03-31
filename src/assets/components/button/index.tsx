import classes from "./index.module.css";

type PropTypes = {
    click?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | Promise<void>;
    text?: string;
};

export default function Button(props: PropTypes) {
    return (
        <button className={classes.main} onClick={props.click}>
            {props.text}
        </button>
    );
}
