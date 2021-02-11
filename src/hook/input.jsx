// @flow
import * as React from 'react'
import type { Input } from 'util/type'

export default (initial: string = ''): Input => {
    const [value, setValue] = React.useState(initial)

    const onChange = React.useCallback(
        (value: string) => {
            setValue(value)
        },
        [setValue]
    )

    return { value, onChange }
}
