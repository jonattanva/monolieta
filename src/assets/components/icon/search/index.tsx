import classes from "./index.module.css";
import source from "../../../images/search.svg";

type PropTypes = {
    height?: number;
    width?: number;
};

export default function Search(props: PropTypes) {
    const {
        height = 24,
        width = 24
    } = props;

    return (
        <svg className={classes.main} width={width} height={height}>
            <use xlinkHref={`${source}#search`} />
        </svg>
    );
}
