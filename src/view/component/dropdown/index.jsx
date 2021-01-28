//@flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import useOutside from '../../hook/outside.jsx'

const Dropdown = styled.div`
    display: inline-block;
    position: relative;
`

const Body = styled.div`
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-highlight, hsl(220, 13%, 20%));
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    min-width: 180px;
    padding: 0;
    position: absolute;
    top: 100%;
    user-select: none;
`

// prettier-ignore
export const Item: React.ComponentType<{}> = styled.div`
    color: hsl(220, 13%, 66%);
    color: var(--color-font-variant, hsl(220, 13%, 66%));
    cursor: pointer;
    padding: 8px 16px;
    white-space: nowrap;

    ${({ disabled }) => disabled && css`
        color: hsl(220, 13%, 50%);
        color: var(--color-font-disabled, hsl(220, 13%, 50%));
        cursor: default;
    `}

    ${({ disabled }) => !disabled &&  css`
        &:hover {
            background-color: #6200ee;
            background-color: var(--color-primary, #6200ee);
            color: hsl(0, 0%, 90%);
            color: var(--color-font, hsl(0, 0%, 90%));
        }
    `}
`

export const Divider: React.ComponentType<{}> = styled.div`
    border-color: hsl(220, 13%, 25%);
    border-color: var(--color-primary-panel-variant, hsl(220, 13%, 25%));
    border-style: solid;
    border-width: 1px;
    cursor: default;
`

type PropsType = {
    children: React.ChildrenArray<React.Element<typeof Item | typeof Divider>>,
    onOutsideTheComponent?: () => void
}

const Root = (props: PropsType): React.Node => {
    const dropdownRef = React.useRef()
    useOutside(dropdownRef, () => {
        if (props.onOutsideTheComponent) {
            props.onOutsideTheComponent()
        }
    })

    return (
        <Dropdown ref={dropdownRef}>
            <Body>{props.children}</Body>
        </Dropdown>
    )
}

Root.displayName = 'Dropdown'

Root.defaultProps = {
    children: []
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
