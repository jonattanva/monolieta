//@flow
export default async (
    recursive: boolean,
    types: Array<string>
): Promise<Array<File>> => {
    return new Promise((resolve) => {
        const isFilter = types.length > 0
        const input = document.createElement('input')
        input.type = 'file'
        //$FlowFixMe[prop-missing]
        input.webkitdirectory = true
        input.addEventListener('change', () => {
            let files = Array.from(input.files).filter((file) => {
                if (isFilter && !types.includes(file.type)) {
                    return false
                }

                if (
                    !recursive &&
                    //$FlowFixMe[prop-missing]
                    file.webkitRelativePath.split('/').length > 2
                ) {
                    return false
                }

                return true
            })
            resolve(files)
        })
        input.click()
    })
}
