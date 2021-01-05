import { useMemo } from 'react'

export default (value, opacity = 1) => {
    return useMemo(() => {
        const hex = value.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        return [r, g, b, opacity]
    }, [value, opacity])
}
