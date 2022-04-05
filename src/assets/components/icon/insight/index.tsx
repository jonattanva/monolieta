import classes from "./index.module.css";
import source from "../../../images/insight.svg";

type PropTypes = {
    height?: number;
    width?: number;
};

export default function Insight(props: PropTypes) {
    const {
        height = 24,
        width = 24
    } = props;

    return (
        <svg className={classes.main} width={width} height={height}>
            <use xlinkHref={`${source}#insight`} />
        </svg>
    );
}
