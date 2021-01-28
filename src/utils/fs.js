// @flow
export const isFileSystemAccess: boolean = (() => {
    return 'showSaveFilePicker' in window
})()

export const saveFile = async (
    blob: Blob,
    options: { filename?: string, description?: string, accept: {} } = {}
): Promise<any | void> => {
    const { filename = 'Untitled', description = '' } = options

    if (!isFileSystemAccess) {
        const a = document.createElement('a')
        a.download = filename
        a.href = URL.createObjectURL(blob)
        a.addEventListener('click', () => {
            setTimeout(() => {
                URL.revokeObjectURL(a.href)
            }, 30 * 1000)
        })
        a.click()
        return
    }

    const handle = await window.showSaveFilePicker({
        excludeAcceptAllOption: false,
        types: [{ description, accept: options.accept }]
    })

    const writable = await handle.createWritable()
    await writable.write(blob)
    await writable.close()
    return handle
}
