//@flow
import * as React from 'react'
import styled from 'styled-components'

const Action = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    border-radius: 4px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    padding: 6px;
    use-select: none;
    width: 32px;

    &:active {
        background-color: hsl(220, 13%, 20%);
        background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    }
`
type PropsType = {
    children: React.Node,
    onClick: (Event) => void
}

const Root = (props: PropsType): React.Node => (
    <Action onClick={props.onClick} role="button">
        {props.children}
    </Action>
)

Root.displayName = 'Action'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
