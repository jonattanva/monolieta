//@flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import useMouseOutside from 'hook/outside'

const Dropdown = styled.div`
    display: inline-block;
    position: relative;
    z-index: 100;
`

const Body = styled.div`
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    min-width: 220px;
    padding: 0;
    position: absolute;
    top: 100%;
    user-select: none;
`

export const Item: React.ComponentType<{}> = styled.div`
    color: var(--color-font-light, hsl(220, 13%, 66%));
    cursor: default;
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    white-space: nowrap;

    ${({ disabled }) =>
        disabled &&
        css`
            color: var(--color-font-dark, hsl(220, 13%, 50%));
            cursor: default;
        `}

    ${({ disabled }) =>
        !disabled &&
        css`
            &:hover {
                background-color: var(--color-primary, #6200ee);
                color: var(--color-font, hsl(0, 0%, 90%));
            }
        `}
`

export const Divider: React.ComponentType<{}> = styled.div`
    border-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    border-style: solid;
    border-width: 1px;
    cursor: default;
`

export const Shortcut: React.ComponentType<{}> = styled.div`
    color: var(--color-font-dark, hsl(220, 13%, 50%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 1.75px;
`

type PropsType = {
    children: React.ChildrenArray<React.Element<typeof Item | typeof Divider>>,
    onOutside?: () => void
}

const Root = (props: PropsType): React.Node => {
    const dropdownRef = React.useRef()

    useMouseOutside(dropdownRef, () => {
        if (props.onOutside) {
            props.onOutside()
        }
    })

    return (
        <Dropdown ref={dropdownRef} role="menu">
            <Body>{props.children}</Body>
        </Dropdown>
    )
}

Root.displayName = 'Dropdown'

export default Root
