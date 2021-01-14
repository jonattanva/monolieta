// @flow
export const getRatio = (width: number, height: number): number =>
    width / height

export const scale = (
    size: { width: number, height: number },
    value: number = 1
): { width: number, height: number } => ({
    width: size.width * value,
    height: size.height * value
})
