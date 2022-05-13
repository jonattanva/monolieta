import classes from "./index.module.css";

type Hash =
    | "insight"
    | "search"
    | "setting"
    | "check"
    | "globe"
    | "lock-close"
    | "exclamation";

type PropTypes = {
    error?: boolean;
    hash?: Hash;
    height?: number;
    source?: string;
    test?: string;
    width?: number;
};

export default function Icon(props: PropTypes) {
    // prettier-ignore
    const {
        error = false,
        height = 24,
        width = 24
     } = props;

    return (
        <svg
            className={!error ? classes.main : classes.error}
            data-testid={props.test}
            height={height}
            width={width}
        >
            <use xlinkHref={`${props.source}#${props.hash}`} />
        </svg>
    );
}
