// @flow
import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    min-height: 32px;
    outline: none;
    padding: 6px 12px;
    width: 100%;

    &[readonly] {
        cursor: default;
    }
`

type PropsType = {
    autofocus?: boolean,
    onChange: (string) => void,
    placeholder?: string,
    readonly?: boolean,
    value: string
}

const Root = (props: PropsType): React.Node => {
    const { readonly = false, placeholder = '', autofocus = false } = props

    const onChange = (event) => {
        if (props.onChange) {
            props.onChange(event.target.value)
        }
    }

    return (
        <Input
            type="text"
            value={props.value}
            onChange={onChange}
            readOnly={readonly}
            autoFocus={autofocus}
            placeholder={placeholder}
        />
    )
}

Root.displayName = 'Text'

export default Root
