import classes from "./index.module.css";

type PropTypes = {
    children?: React.ReactNode;
    title?: string;
};

export default function Label(props: PropTypes) {
    return (
        <label className={classes.main}>
            {props.title}
            {props.children}
        </label>
    );
}
