import Picture from "../picture";
import classes from "./index.module.css";
import useResize from "../../hooks/resize";
import { getScale } from "../../library/math";
import { useEffect, useRef, useState } from "react";
import {
    Size,
    calculateEditorSize,
    calculateAspectRatio,
    calculateImagePosition,
} from "../../library/display";

type PropTypes = {
    alt?: string;
    scale?: number;
    source?: string;
};

type InternalPropTypes = {
    children?: React.ReactNode;
    editor: Size;
    image: Size;
    scale?: number;
};

export default function Canvas(props: PropTypes) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState({ width: 0, height: 0 });

    const editor = useResize(scrollRef);
    const onNaturalSize = (width: number, height: number) =>
        setImage({ width, height });

    return (
        <div ref={scrollRef} className={classes.main}>
            <div className={classes.scroll}>
                <Viewport editor={editor} image={image}>
                    <Picture
                        alt={props.alt}
                        onNaturalSize={onNaturalSize}
                        source={props.source}
                    />
                    <Layer />
                </Viewport>
            </div>
        </div>
    );
}

function Viewport(props: InternalPropTypes) {
    const imageRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const aspectRatio = calculateAspectRatio(props.editor, props.image);
        const scale = getScale(
            aspectRatio.width,
            aspectRatio.height,
            props.scale
        );

        const editorSize = calculateEditorSize(
            aspectRatio.x,
            aspectRatio.y,
            scale.width,
            scale.height
        );

        if (editorRef.current) {
            editorRef.current.style.width = `${editorSize.width}px`;
            editorRef.current.style.height = `${editorSize.height}px`;
        }

        if (imageRef.current) {
            const { x, y, width, height } = calculateImagePosition(
                aspectRatio,
                props.editor,
                props.image
            );

            imageRef.current.style.left = `${x}px`;
            imageRef.current.style.top = `${y}px`;
            imageRef.current.style.width = `${width}px`;
            imageRef.current.style.height = `${height}px`;
        }
    }, [props.editor, props.image]);

    return (
        <div className={classes.viewport} ref={editorRef}>
            <div className={classes.content} ref={imageRef}>
                {props.children}
            </div>
        </div>
    );
}

function Layer() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
        >
            <defs>
                <circle id="edge" className={classes.circle} r="5" />
            </defs>
        </svg>
    );
}
