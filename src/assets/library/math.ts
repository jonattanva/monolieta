export const getScale = (width: number, height: number, scale: number = 1) => ({
    width: width * scale,
    height: height * scale,
});

export const centroid = (
    x: number,
    y: number,
    width: number,
    height: number
) => [x + width / 2, y + height / 2];

export const getArea = (width: number, height: number) => width * height;

export const getRatio = (width: number, height: number) => width / height;
