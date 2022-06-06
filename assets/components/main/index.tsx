import classes from "./index.module.css";

type PropTypes = {
    children: React.ReactNode;
};

export default function Main(props: PropTypes) {
    return <div className={classes.main}>{props.children}</div>;
}
