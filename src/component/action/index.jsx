//@flow
import * as React from 'react'
import styled from 'styled-components'

const Action = styled.div`
    align-items: center;
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    padding: 6px;
    use-select: none;
    width: 32px;

    &:active {
        background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    }
`
type PropsType = {
    children: React.Node,
    onClick: (Event) => void,
    title?: string,
    cy?: string | null
}

const Root = (props: PropsType): React.Node => (
    <Action
        role="button"
        data-cy={props.cy}
        title={props.title}
        onClick={props.onClick}>
        {props.children}
    </Action>
)

Root.displayName = 'Action'

export default Root
