import classes from "./index.module.css";

type PropTypes = {
    alt?: string;
    click?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onNaturalSize?: (width: number, height: number) => void;
    source?: string;
    test?: string;
};

export default function Picture(props: PropTypes) {
    function onNaturalSize(event: React.SyntheticEvent<HTMLImageElement>) {
        if (props.onNaturalSize) {
            props.onNaturalSize(
                event.currentTarget.naturalWidth,
                event.currentTarget.naturalHeight
            );
        }
    }

    return (
        <div className={classes.cover} onClick={props.click}>
            {props.source && (
                <img
                    alt={props.alt}
                    className={classes.image}
                    data-testid={props.test}
                    onLoad={onNaturalSize}
                    src={props.source}
                />
            )}
        </div>
    );
}
