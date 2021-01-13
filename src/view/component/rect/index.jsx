// @flow
import * as React from 'react'
import styled from 'styled-components'

// prettier-ignore
const Rect = styled.rect`
    fill: transparent;
    stroke-linejoin: round;
    stroke-opacity: 0.7;
    stroke-width: 2px;
    stroke: #15ff0d;
    vector-effect: non-scaling-stroke;

    ${({ isCorner }) => isCorner && `
        &:hover {
            cursor: grab;
        }
    `}
`

const Corner = styled.circle`
    fill: #6200ee;
    opacity: 1;
    stroke-width: 20;
    vector-effect: non-scaling-stroke;
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
    const clientRef = React.useRef()
    const isMouseDown = React.useRef(false)

    const [isCorner, setCorner] = React.useState(false)

    const onSelect = React.useCallback(() => {
        setCorner(true)
    }, [setCorner])

    const center = React.useMemo(() => {
        return [props.x + props.width / 2, props.y + props.height / 2]
    }, [props.x, props.width, props.y, props.height])

    const handleResize = React.useCallback(
        (event: any) => {
            if (!isMouseDown.current || !clientRef.current) {
                return
            }

            const { clientX, clientY } = event
            const { startX, startY, type } = clientRef.current

            const deltaX = clientX - startX
            const deltaY = clientY - startY

            let [centerX, centerY] = center
            let { x, y, width, height } = props

            switch (type) {
                case 'nw-resize': {
                    const reverseX = -deltaX
                    const reverseY = -deltaY

                    width = width + reverseX
                    height = height + reverseY

                    centerX = centerX - reverseX / 2
                    centerY = centerY - reverseY / 2
                    break
                }

                case 'n-resize': {
                    const reverseY = -deltaY
                    height = height + reverseY
                    centerY = centerY - reverseY / 2
                    break
                }

                case 'ne-resize': {
                    const reverseY = -deltaY

                    width = width + deltaX
                    height = height + reverseY

                    centerX = centerX + deltaX / 2
                    centerY = centerY - reverseY / 2
                    break
                }

                case 'e-resize': {
                    width = width + deltaX
                    centerX = centerX + deltaX / 2
                    break
                }

                case 'se-resize': {
                    width = width + deltaX
                    height = height + deltaY

                    centerX = centerX + deltaX / 2
                    centerY = centerY + deltaY / 2
                    break
                }

                case 's-resize': {
                    height = height + deltaY
                    centerY = centerY + deltaY / 2
                    break
                }

                case 'sw-resize': {
                    const reverseX = -deltaX

                    width = width + reverseX
                    height = height + deltaY

                    centerX = centerX - reverseX / 2
                    centerY = centerY + deltaY / 2
                    break
                }

                case 'w-resize': {
                    const reverseX = -deltaX
                    width = width + reverseX
                    centerX = centerX - reverseX / 2
                    break
                }
            }

            if (Math.sign(width) !== 1) {
                width = -width
            }

            if (Math.sign(height) !== 1) {
                height = -height
            }

            x = centerX - width / 2
            y = centerY - height / 2

            if (props.onResize) {
                props.onResize(x, y, width, height)
            }
        },
        [center, props]
    )

    const handleDrag = React.useCallback(
        (event: any) => {
            if (!isMouseDown.current || !clientRef.current) {
                return
            }

            const { clientX, clientY } = event
            const { startX, startY } = clientRef.current

            const deltaX = clientX - startX
            const deltaY = clientY - startY

            if (props.onDrag) {
                props.onDrag(deltaX, deltaY)
            }

            clientRef.current = {
                type: null,
                startX: clientX,
                startY: clientY
            }
        },
        [props]
    )

    const onRestart = React.useCallback(() => {
        if (document.body) {
            document.body.style.cursor = 'auto'
        }

        document.removeEventListener('mouseup', onRestart)
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mousemove', handleResize)

        if (!isMouseDown.current) {
            return
        }

        clientRef.current = null
        isMouseDown.current = false
    }, [handleDrag, handleResize])

    const onDrag = React.useCallback(
        (event: any) => {
            isMouseDown.current = true
            if (document.body) {
                document.body.style.cursor = 'grab'
            }

            const { clientX, clientY } = event
            clientRef.current = {
                type: null,
                startX: clientX,
                startY: clientY
            }

            document.addEventListener('mouseup', onRestart)
            document.addEventListener('mousemove', handleDrag)
        },
        [handleDrag, onRestart]
    )

    const onResize = React.useCallback(
        (event: any) => {
            isMouseDown.current = true
            if (document.body) {
                document.body.style.cursor = event.target.style.cursor
            }
            const { clientX, clientY } = event
            const type = event.target.dataset.type
            clientRef.current = {
                type,
                startX: clientX,
                startY: clientY
            }

            document.addEventListener('mouseup', onRestart)
            document.addEventListener('mousemove', handleResize)
        },
        [handleResize, onRestart]
    )

    return (
        <React.Fragment>
            <Rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                onClick={onSelect}
                isCorner={isCorner}
                role="bounding-box"
                onMouseDown={onDrag}
            />

            {isCorner && (
                <g>
                    <defs>
                        <Corner id="corner" r="5" />
                    </defs>

                    <use
                        xlinkHref="#corner"
                        data-type="nw-resize"
                        style={{ cursor: 'nwse-resize' }}
                        x={props.x}
                        y={props.y}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="n-resize"
                        style={{ cursor: 'ns-resize' }}
                        x={props.x + props.width / 2}
                        y={props.y}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="ne-resize"
                        style={{ cursor: 'nesw-resize' }}
                        x={props.x + props.width}
                        y={props.y}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="e-resize"
                        style={{ cursor: 'ew-resize' }}
                        x={props.x + props.width}
                        y={props.y + props.height / 2}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="s-resize"
                        style={{ cursor: 'ns-resize' }}
                        x={props.x + props.width / 2}
                        y={props.y + props.height}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="se-resize"
                        style={{ cursor: 'nwse-resize' }}
                        x={props.x + props.width}
                        y={props.y + props.height}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="sw-resize"
                        style={{ cursor: 'nesw-resize' }}
                        x={props.x}
                        y={props.y + props.height}
                        role="corner"
                        onMouseDown={onResize}
                    />

                    <use
                        xlinkHref="#corner"
                        data-type="w-resize"
                        style={{ cursor: 'ew-resize' }}
                        x={props.x}
                        y={props.y + props.height / 2}
                        role="corner"
                        onMouseDown={onResize}
                    />
                </g>
            )}
        </React.Fragment>
    )
}

Root.displayName = 'Rect'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
