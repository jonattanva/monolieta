//@flow
export const generateWorkSpace = (key: string, name: string): Blob => {
    const workspace = JSON.stringify({
        project: {
            key,
            name
        },
        version: 1
    })

    return new Blob([workspace], {
        type: 'application/json'
    })
}
