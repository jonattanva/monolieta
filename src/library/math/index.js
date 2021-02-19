// @flow
import * as Monolieta from 'Monolieta'

export const getRatio = (width: number, height: number): number =>
    width / height

export const spectRatio = (
    { width, height }: Monolieta.Size,
    ratio: number
): Monolieta.Position => {
    const parent = getRatio(width, height)
    if (parent < ratio) {
        const innerHeight = width / ratio
        return {
            x: 0,
            y: (height - innerHeight) / 2,
            width,
            height: innerHeight
        }
    }

    const innerWidth = height * ratio
    return {
        x: (width - innerWidth) / 2,
        y: 0,
        width: innerWidth,
        height
    }
}

export const getScale = (
    size: Monolieta.Size,
    value: number = 1
): Monolieta.Size => ({
    width: size.width * value,
    height: size.height * value
})
