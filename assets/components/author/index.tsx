import classes from "./index.module.css";

type PropTypes = {
    home?: () => void;
    name: string;
    privacy: string;
    project: string;
    refresh?: () => void;
};

export default function Author(props: PropTypes) {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <span className={classes.pointer} onClick={props.home}>
                    {props.name}
                </span>
                <span>/</span>
                <span className={classes.pointer} onClick={props.refresh}>
                    {props.project}
                </span>
            </div>
            <span className={classes.label}>{props.privacy}</span>
        </div>
    );
}
