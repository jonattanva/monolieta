import { useMemo } from 'react'

export default (value) => (
    useMemo(() => (
        value && value.replace(/(.*\/.*\/|\?.*)/g, '')
    ), [ value ])
)