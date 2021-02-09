//@flow

const prepare = async (
    handle: any,
    options: { recursive: boolean, types: Array<string> },
    path: string = handle.name
): Promise<Array<File>> => {
    const files = []
    const isFilter = options.types.length > 0

    for await (const entry of handle.values()) {
        const root = `${path}/${entry.name}`

        if (entry.kind === 'file') {
            const file = await entry.getFile()
            if (!file.type) {
                const extension = file.name.split('.').pop()
                if (extension === 'eva') {
                    Object.defineProperty(file, 'type', {
                        configurable: true,
                        enumerable: true,
                        get: () => 'application/json'
                    })
                }
            }

            if (isFilter && !options.types.includes(file.type)) {
                continue
            }

            Object.defineProperty(file, 'webkitRelativePath', {
                configurable: true,
                enumerable: true,
                get: () => root
            })

            files.push(file)
            continue
        }

        if (entry.kind === 'directory' && options.recursive) {
            files.push([...(await prepare(entry, options, root))])
        }
    }

    return files.flat()
}

export default async (
    recursive: boolean,
    types: Array<string>
): Promise<Array<File>> => {
    const handle = await window.showDirectoryPicker()
    return prepare(handle, {
        recursive,
        types
    })
}
