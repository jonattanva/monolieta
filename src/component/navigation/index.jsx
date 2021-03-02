// @flow
import * as React from 'react'
import styled from 'styled-components'

const Navigation = styled.div`
    align-items: center;
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-flow: var(--navigation-orientation, column);
    margin: 8px;
    padding: 0;
    right: 0;
    user-select: none;
`

export const Access: React.ComponentType<{}> = styled.div`
    align-items: center;
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: 4px;
    padding: 6px;
    width: 32px;

    &:active {
        background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    }
`

type PropsType = {
    children: React.ChildrenArray<React.Element<typeof Access>>,
    orientation: 'vertical' | 'horizontal'
}

const Root = (props: PropsType): React.Node => {
    return (
        <Navigation
            role="navigation"
            style={{
                '--navigation-orientation':
                    props.orientation === 'vertical' ? 'row' : 'column'
            }}>
            {props.children}
        </Navigation>
    )
}

Root.displayName = 'Navigation'

export default Root
