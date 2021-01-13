// @flow
import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-dark, hsl(220, 13%, 15%));
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
    onChange?: (Event) => void,
    placeholder?: string,
    value?: string
}

const Text = (props: PropsType): React.Node => (
    <Input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
    />
)

Text.defaultProps = {
    onChange: null,
    placeholder: ''
}

export default (React.memo<PropsType>(Text): React.AbstractComponent<
    PropsType,
    mixed
>)
