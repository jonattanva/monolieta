import classes from "./index.module.css";

type Hash = "insight" | "search" | "setting";

type PropTypes = {
    hash?: Hash;
    height?: number;
    source?: string;
    test?: string;
    width?: number;
};

export default function Icon(props: PropTypes) {
    const { height = 24, width = 24 } = props;

    return (
        <svg
            className={classes.main}
            data-testid={props.test}
            height={height}
            width={width}
        >
            <use xlinkHref={`${props.source}#${props.hash}`} />
        </svg>
    );
}
