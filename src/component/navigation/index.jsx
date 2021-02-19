// @flow
import * as React from 'react'
import styled from 'styled-components'

const Navigation = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    padding: 8px;
    margin: 8px;
    position: relative;
    right: 0;
    top: 56px;
`

export const Access: React.ComponentType<{}> = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: 4px;
    width: 32px;

    &:hover {
        background-color: hsl(220, 13%, 15%);
        background-color: var(--color-secondary, hsl(220, 13%, 15%));
        border-radius: 4px;
    }
`

type PropsType = {
    children: React.ChildrenArray<React.Element<typeof Access>>
}

const Root = (props: PropsType): React.Node => {
    return <Navigation role="navigation">{props.children}</Navigation>
}

Root.displayName = 'Navigation'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
