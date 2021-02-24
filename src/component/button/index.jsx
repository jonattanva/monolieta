// @flow
import * as React from 'react'
import styled from 'styled-components'

const Button = styled.div`
    align-items: center;
    background-color: var(--color-primary, #6200ee);
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: inline-flex;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    height: 32px;
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
        background-color: var(--color-primary-light, #9951ff);
    }
`

type PropsType = {
    children: React.Node,
    className?: string,
    onClick?: (Event) => void | Promise<void>
}

const Root = (props: PropsType): React.Node => (
    <Button className={props.className} onClick={props.onClick} role="button">
        {props.children}
    </Button>
)

Root.displayName = 'Button'

export default Root
