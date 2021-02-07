// @flow
import * as React from 'react'

export default (
    initial: string = ''
): ({ value: string, onChange: (string) => void }) => {
    const [value, setValue] = React.useState(initial)

    const onChange = React.useCallback(
        (value: string) => {
            setValue(value)
        },
        [setValue]
    )

    return { value, onChange }
}
