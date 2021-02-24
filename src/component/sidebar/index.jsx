// @flow
import * as React from 'react'
import styled from 'styled-components'

const Sidebar = styled.div`
    background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    border-radius: 4px;
    box-sizing: border-box;
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    min-width: 320px;
    padding: 16px;
    position: absolute;
    right: 32px;
    top: 100%;
    user-select: none;
    width: 320px;
`

const Title = styled.div`
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    width: 100%;
`

type PropsType = {
    children: React.Node,
    title: string
}

const Root = (props: PropsType): React.Node => (
    <Sidebar>
        <Title>{props.title}</Title>
        {props.children}
    </Sidebar>
)

Root.displayName = 'Sidebar'

export default Root
