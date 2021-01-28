//@flow
import * as React from 'react'
import styled from 'styled-components'

const Icon: React.ComponentType<{}> = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
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

    &:hover {
        background-color: hsl(220, 13%, 20%);
        background-color: var(--color-secondary-panel, hsl(220, 13%, 20%));
    }
`

export default Icon
