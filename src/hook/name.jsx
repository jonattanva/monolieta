import { useMemo } from 'react'

export default (value) => (
    useMemo(() => (
        value.replace(/(.*\/.*\/|\?.*)/g, '')
    ), [ value ])
)