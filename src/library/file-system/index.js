//@flow
import * as Monolieta from 'Monolieta'

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

export const readJson = async <T>(blob: Blob): Promise<T> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', (event: any) => {
            try {
                resolve(JSON.parse(event.target.result))
            } catch (error) {
                reject(error)
            }
        })
        reader.onerror = reject
        reader.readAsText(blob)
    })
}

export const isMonolietaFile = (file: File): boolean => {
    return file.name.split('.').pop() === 'monolieta'
}

export const upload = async <T>(
    reviver?: (File: File) => null | T,
    accept?: Array<string> = ['*/*'],
    multiple?: boolean = true
): Promise<Array<T>> => {
    return new Promise((resolve) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = accept.join(',')
        input.multiple = multiple
        input.addEventListener('change', () => {
            const files = []
            Array.from(input.files).forEach((file) => {
                if (!reviver) {
                    //$FlowFixMe[incompatible-return]
                    files.push(file)
                    return
                }

                const result = reviver(file)
                if (result) {
                    files.push(result)
                }
            })
            resolve(files)
        })
        input.click()
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

export const saveFile = async (blob: Blob, options: Monolieta.Option = {}) => {
    await (isSaveFilePicker
        ? await import('./future/save.js')
        : await import('./legacy/save.js')
    ).default(blob, options)
}
