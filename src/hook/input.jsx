// @flow
import * as React from 'react'
import * as Monolieta from 'Monolieta'

export default (initial: string = ''): Monolieta.Input => {
    const [value, setValue] = React.useState(initial)

    const onChange = React.useCallback(
        (value: string) => {
            setValue(value)
        },
        [setValue]
    )

    return { value, onChange }
}
