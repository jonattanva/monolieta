// @flow
import * as React from 'react'
import styled from 'styled-components'

const Rect = styled.rect`
    fill: transparent;
    stroke-linejoin: round;
    stroke-opacity: 0.7;
    stroke-width: 2px;
    stroke: var(--color-primary, #6200ee);
    vector-effect: non-scaling-stroke;

    ${({ isCorner }) =>
        isCorner &&
        `
        &:hover {
            cursor: grab;
        }
    `}
`

type PropsType = {
    x: number,
    y: number,
    width: number,
    height: number,
    onDrag: (x: number, y: number) => void,
    onResize: (x: number, y: number, width: number, height: number) => void
}

const Root = (props: PropsType): React.Node => {
    return (
        <React.Fragment>
            <Rect />
        </React.Fragment>
    )
}

Root.displayName = 'Rect'

export default Root
