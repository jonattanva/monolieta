import classes from "./index.module.css";

type PropTypes = {
    back?: () => void;
    name: string;
    privacy?: "Public" | "Private";
    project: string;
    refresh?: () => void;
};

export default function Author(props: PropTypes) {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <span className={classes.secondary} onClick={props.back}>
                    {props.name}
                </span>
                <span>/</span>
                <span className={classes.primary} onClick={props.refresh}>
                    {props.project}
                </span>
            </div>
            <span className={classes.label}>{props.privacy}</span>
        </div>
    );
}
