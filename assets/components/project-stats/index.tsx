import Document from "../resources/document";
import Storage from "../resources/storage";
import classes from "./index.module.css";
import {
    files as useFormatFile,
    storage as useFormatStorage,
} from "../../hooks/format";

type PropTypes = {
    files?: number;
    storage?: number;
};

export default function Stats(props: PropTypes) {
    const filesView = useFormatFile(props.files);
    const storageView = useFormatStorage(props.storage);

    return (
        <div className={classes.main}>
            <ul className={classes.stats}>
                <li className={classes.item}>
                    <Document width={14} height={14} />
                    <span>{`${filesView} Files`}</span>
                </li>
                <li className={classes.item}>
                    <Storage width={14} height={14} />
                    <span>{`${storageView} Storage`}</span>
                </li>
            </ul>
        </div>
    );
}
