// @flow
import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    min-height: 38px;
    outline: none;
    padding: 6px 12px;
    width: 100%;
`

type PropsType = {
    autofocus?: boolean,
    onChange: (string) => void,
    placeholder?: string,
    value: string
}

const Root = (props: PropsType): React.Node => {
    const onChange = React.useCallback(
        (event) => {
            if (props.onChange) {
                props.onChange(event.target.value)
            }
        },
        [props]
    )

    return (
        <Input
            type="text"
            value={props.value}
            onChange={onChange}
            autoFocus={props.autofocus}
            placeholder={props.placeholder}
        />
    )
}

Root.displayName = 'Text'

Root.defaultProps = {
    autofocus: false,
    placeholder: ''
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
