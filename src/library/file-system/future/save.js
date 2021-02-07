//@flow
import type { Option } from '../type'

export default async (blob: Blob, options: Option) => {
    const accept = {}
    const { description = '', extensions = [] } = options

    accept[blob.type] = extensions
    const handle = await window.showSaveFilePicker({
        types: [
            {
                description: description,
                accept: accept
            }
        ]
    })

    const writable = await handle.createWritable()
    await writable.write(blob)
    await writable.close()
}
