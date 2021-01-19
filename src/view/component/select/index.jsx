// @flow
import * as React from 'react'
import Select from 'react-select'

const styles = {
    control: (base) => ({
        ...base,
        background: 'hsl(220, 13%, 15%)',
        borderColor: 'hsl(220, 13%, 15%)',
        height: 40,
        minHeight: 40,
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

type Option = {
    value: string,
    label: string
}

type PropsType = {
    options: Array<Option>,
    placeholder?: string,
    defaultValue?: Option | null,
    onChange: (Option) => void
}

const Root = (props: PropsType): React.Node => (
    <Select
        styles={styles}
        options={props.options}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
    />
)

Root.displayName = 'Select'

Root.defaultProps = {
    defaultValue: null
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
