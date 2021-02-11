// @flow
export type Image = {
    id: string,
    file: File,
    selected: boolean
}

export type Input = {
    value: string,
    onChange: (string) => void
}
