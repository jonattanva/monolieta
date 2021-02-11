//@flow
export default async <T>(
    reviver: (File: File) => null | T,
    recursive: boolean = true
): Promise<Array<T>> => {
    return new Promise((resolve) => {
        const input = document.createElement('input')
        input.type = 'file'
        //$FlowFixMe[prop-missing]
        input.webkitdirectory = true
        input.addEventListener('change', () => {
            const files = []
            Array.from(input.files).forEach((file) => {
                if (!recursive) {
                    //$FlowFixMe[prop-missing]
                    if (file.webkitRelativePath.split('/').length > 2) {
                        return
                    }
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
