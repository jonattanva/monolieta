import classes from "./index.module.css";

type PropTypes = {
    click?: () => void;
    description?: string;
    name?: string;
    owner?: string;
    test?: string;
    total?: number;
    visibility?: "Public" | "Private";
};

export default function Project(props: PropTypes) {
    const { total = 0 } = props;

    return (
        <div
            className={classes.main}
            data-testid={props.test}
            onClick={props.click}
            role="row"
        >
            <div className={classes.banner}>
                {total > 0 && (
                    <div className={classes.items}>
                        <div className={classes.total}>{`${total} items`}</div>
                    </div>
                )}
            </div>
            <div className={classes.body}>
                <div className={classes.name}>
                    <div>{props.name}</div>
                    <div className={classes.visibility}>{props.visibility}</div>
                </div>
                <div className={classes.owner}>{props.owner}</div>
                <div className={classes.description}>
                    <div className={classes.truncate}>{props.description}</div>
                </div>
            </div>
        </div>
    );
}
