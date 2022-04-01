import classes from "./index.module.css";
import source from "../../images/search.svg";
import Body, { type PropTypes } from "./body";

export default function Search(props: PropTypes) {
    return (
        <div>
            <div className={classes.icon}>
                <img src={source} width={14} height={14} />
            </div>
            <Body {...props} />
        </div>
    );
}
