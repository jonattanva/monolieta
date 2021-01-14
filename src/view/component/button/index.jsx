// @flow
import * as React from 'react'
import styled from 'styled-components'

const Button = styled.div`
    align-items: center;
    background-color: #6200ee;
    background-color: var(--color-primary, #6200ee);
    border-radius: 4px;
    box-sizing: border-box;
    color: hsla(0, 0%, 100%, 0.9);
    color: var(--color-font, hsla(0, 0%, 100%, 0.9));
    cursor: pointer;
    display: inline-flex;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    height: 36px;
    justify-content: center;
    line-height: 18px;
    min-width: 64px;
    outline: none;
    padding: 0 16px 0 16px;
    position: relative;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:active {
        background-color: #9951ff;
        background-color: var(--color-primary-variant, #9951ff);
    }
`

type PropsType = {
    children: React.Node,
    onClick?: (Event) => void
}

const Root = (props: PropsType): React.Node => (
    <Button onClick={props.onClick} role="button">
        {props.children}
    </Button>
)

Root.displayName = 'Button'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
