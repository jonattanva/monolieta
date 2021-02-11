//@flow
import type { Option } from './type'

export const isSaveFilePicker: boolean = (() =>
    'showSaveFilePicker' in window)()

export const isDirectoryPicker: boolean = (() =>
    'showDirectoryPicker' in window)()

export const readFile = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', (event: any) => {
            resolve(event.target.result)
        })
        reader.onerror = reject
        reader.readAsText(blob)
    })
}

export const readImage = async (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', (event: any) => {
            resolve(event.target.result)
        })
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export const directory = async <T>(
    reviver?: (File: File) => null | T,
    recursive?: boolean = true
): Promise<Array<T>> => {
    const directory = isDirectoryPicker
        ? import('./future/directory.js')
        : import('./legacy/directory.js')

    return (await directory).default((file) => {
        if (reviver) {
            return reviver(file)
        }
        //$FlowFixMe[incompatible-return]
        return file
    }, recursive)
}

export const saveFile = async (blob: Blob, options: Option = {}) => {
    await (isSaveFilePicker
        ? await import('./future/save.js')
        : await import('./legacy/save.js')
    ).default(blob, options)
}
