import { useMemo } from 'react'

export default (value = 1, locale = 'en') => (
    useMemo(() => (
        ((value * 100) / 100).toLocaleString(locale, {
            style: 'percent'
        })
    ), [value, locale])
)