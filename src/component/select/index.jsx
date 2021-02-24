// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import Select from 'react-select'

const styles = {
    control: (base) => ({
        ...base,
        background: 'hsl(220, 13%, 15%)',
        borderColor: 'hsl(220, 13%, 15%)',
        height: 32,
        minHeight: 32,
        '&:hover': {
            borderColor: 'hsl(220, 13%, 15%)'
        }
    }),
    indicatorSeparator: (base) => ({
        ...base,
        background: 'transparent'
    }),
    indicatorsContainer: (base) => ({
        ...base,
        height: '100%'
    }),
    menu: (base) => ({
        ...base,
        background: 'hsl(220, 13%, 15%)',
        color: 'hsl(0, 0%, 90%)'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: 'hsl(0, 0%, 90%)',
        '&:hover': {
            color: 'hsl(219, 13%, 66%)'
        }
    }),
    singleValue: (base) => ({
        ...base,
        color: 'hsl(0, 0%, 90%)'
    }),
    input: (base) => ({
        ...base,
        color: 'hsl(0, 0%, 90%)'
    })
}

type PropsType = {
    defaultValue?: Monolieta.Select | null,
    onChange: (Monolieta.Select) => void,
    options: Array<Monolieta.Select>,
    placeholder?: string
}

const Root = (props: PropsType): React.Node => (
    <Select
        styles={styles}
        options={props.options}
        onChange={props.onChange}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
    />
)

Root.displayName = 'Select'

Root.defaultProps = {
    defaultValue: null
}

export default Root
