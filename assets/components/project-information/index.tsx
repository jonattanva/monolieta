import classes from "./index.module.css";

type PropTypes = {
    author?: string;
    back?: () => void;
    privacy?: "Public" | "Private";
    project?: string;
};

export default function Information(props: PropTypes) {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.project}>{props.project}</h1>
                <span className={classes.author} onClick={props.back}>
                    {props.author}
                </span>
            </div>
            {props.privacy && (
                <span className={classes.label}>{props.privacy}</span>
            )}
        </div>
    );
}
