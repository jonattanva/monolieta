import classes from "./index.module.css";
import useTimeout from "../../hooks/timeout";

type PropTypes = {
    close?: () => void;
    delay?: number | null;
    message: string;
    test?: string;
};

export default function Snackbar(props: PropTypes) {
    const { delay = null } = props;

    useTimeout(() => {
        if (props.close) {
            props.close();
        }
    }, delay);

    return (
        <div className={classes.main} data-testid={props.test}>
            <div className={classes.surface}>
                <div className={classes.label} role="status">
                    {props.message}
                </div>
                <div className={classes.action}>
                    <button className={classes.dismiss}>
                        <Dismiss />
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dismiss() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}
