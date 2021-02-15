//@flow
import * as Monolieta from 'Monolieta'

export default async (
    blob: Blob,
    { filename = 'Untitled' }: Monolieta.Option
) => {
    const a = document.createElement('a')
    a.download = filename
    a.href = URL.createObjectURL(blob)
    a.addEventListener('click', () => {
        setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000)
    })
    a.click()
}
