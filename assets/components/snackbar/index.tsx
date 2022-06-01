import Dismiss from "../resources/dismiss";
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
                    <button className={classes.dismiss} onClick={props.close}>
                        <Dismiss width={24} height={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
