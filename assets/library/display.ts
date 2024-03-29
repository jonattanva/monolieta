import { getArea, getRatio } from "./math";

export type Size = {
    width: number;
    height: number;
};

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const calculateAspectRatio = (container: Size, image: Size) => {
    const ratio = getRatio(image.width, image.height);
    const containerRatio = getRatio(container.width, container.height);

    return containerRatio < ratio
        ? calculateImageInVertical(container, ratio)
        : calculateImageInHorizontal(container, ratio);
};

export const calculateEditorSize = (
    x: number,
    y: number,
    width: number,
    height: number
) => ({
    width: width + 2 * x,
    height: height + 2 * y,
});

export const calculateImagePosition = (
    aspectRatio: Rect,
    editor: Size,
    image: Size
) => {
    const a1 = getArea(editor.width, editor.height);
    const a2 = getArea(image.width, image.height);

    if (a2 < a1) {
        aspectRatio.x = (editor.width - image.width) / 2;
        aspectRatio.y = (editor.height - image.height) / 2;
        aspectRatio.width = image.width;
        aspectRatio.height = image.height;
    } else {
        aspectRatio.width = editor.width - 2 * aspectRatio.x;
        aspectRatio.height = editor.height - 2 * aspectRatio.y;
    }

    return aspectRatio;
};

function calculateImageInVertical(container: Size, ratio: number) {
    const innerHeight = container.width / ratio;
    const y = (container.height - innerHeight) / 2;

    return {
        x: 0,
        y: y,
        width: container.width,
        height: innerHeight,
    };
}

function calculateImageInHorizontal(container: Size, ratio: number) {
    const innerWidth = container.height * ratio;
    const x = (container.width - innerWidth) / 2;

    return {
        x: x,
        y: 0,
        width: innerWidth,
        height: container.height,
    };
}
