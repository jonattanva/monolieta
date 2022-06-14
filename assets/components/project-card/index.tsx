import classes from "./index.module.css";

type PropTypes = {
    onClick?: () => void;
    description?: string;
    name?: string;
    owner?: string;
    privacy?: "Public" | "Private";
    test?: string;
    total?: number;
};

export default function Card(props: PropTypes) {
    const { total = 0 } = props;

    return (
        <div
            className={classes.main}
            data-testid={props.test}
            onClick={props.onClick}
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
                    <div className={classes.visibility}>{props.privacy}</div>
                </div>
                <div className={classes.owner}>{props.owner}</div>
                <div className={classes.description}>
                    <div className={classes.truncate}>{props.description}</div>
                </div>
            </div>
        </div>
    );
}
