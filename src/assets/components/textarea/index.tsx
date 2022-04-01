import classes from "./index.module.css";

type PropTypes = {
    autofocus?: boolean;
    name?: string;
    placeholder?: string;
    test?: string;
};

export default function Textrea(props: PropTypes) {
    const { autofocus = false } = props;

    return (
        <textarea
            className={classes.main}
            autoFocus={autofocus}
            data-testid={props.test}
            name={props.name}
            placeholder={props.placeholder}
        />
    );
}
