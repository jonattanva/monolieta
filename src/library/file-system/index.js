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

export const saveFile = async (blob: Blob, options: Option = {}) => {
    await (isSaveFilePicker
        ? await import('./future/save.js')
        : await import('./legacy/save.js')
    ).default(blob, options)
}

export const openFile = async () => {

}

export const openDirectory = async (
    recursive: boolean = false,
    type: Array<string> = []
): Promise<Array<File>> => {
    return (
        await (isDirectoryPicker
            ? import('./future/directory.js')
            : import('./legacy/directory.js'))
    ).default(recursive, type)
}
