import classes from "./index.module.css";
import source from "../../../images/setting.svg";

type PropTypes = {
    height?: number;
    width?: number;
};

export default function Setting(props: PropTypes) {
    const {
        height = 24,
        width = 24
    } = props;

    return (
        <svg className={classes.main} width={width} height={height}>
            <use xlinkHref={`${source}#setting`} />
        </svg>
    );
}
