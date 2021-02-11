//@flow
const directory = async <T>(
    handle: any,
    reviver: (File: File) => null | T,
    recursive: boolean,
    path: string = handle.name
): Promise<Array<T>> => {
    const files = []
    for await (const entry of handle.values()) {
        const root = `${path}/${entry.name}`
        if (entry.kind === 'file') {
            const file = await entry.getFile()

            Object.defineProperty(file, 'webkitRelativePath', {
                configurable: true,
                enumerable: true,
                get: () => root
            })

            const result = reviver(file)
            if (result) {
                files.push(result)
            }
            continue
        }

        if (recursive && entry.kind === 'directory') {
            const extras = await directory(entry, reviver, recursive, root)
            files.push(...extras)
        }
    }

    return files
}

export default async <T>(
    reviver: (File: File) => null | T,
    recursive: boolean = true
): Promise<Array<T>> => {
    const handle = await window.showDirectoryPicker()
    return directory(handle, reviver, recursive)
}
