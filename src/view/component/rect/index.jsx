// @flow
import * as React from 'react'
import styled from 'styled-components'

const Box = styled.rect`
    fill-opacity: 0.2;
    stroke-linejoin: round;
    stroke-opacity: 0.7;
    stroke-width: 2px;
`

const Anchor = styled.circle`
    fill: red;
    opacity: 0.65;
    stroke-width: 20;
    stroke: rgba(255, 51, 51, 0.16);
`

type Bounding = {
    key: string,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    anchor: boolean
}

type PropsType = {
    dataSource: Array<Bounding>
}

const Rect = (props: PropsType): React.Node => {
    const [dataSource, setDataSource] = React.useState(props.dataSource)

    React.useEffect(() => {
        setDataSource(props.dataSource)
    }, [props.dataSource])

    const onSelect = React.useCallback(
        (event) => {
            setDataSource((current: Array<Bounding>) => {
                const key = event.target.dataset.key
                return current.map((value) => {
                    value.anchor = false
                    if (value.key === key) {
                        value.anchor = true
                    }
                    return value
                })
            })
        },
        [setDataSource]
    )

    return (
        <React.Fragment>
            <defs>
                <Anchor id="anchor" r="5" />
            </defs>
            {dataSource.map((box: Bounding) => (
                <g key={box.key}>
                    <Box
                        data-key={box.key}
                        x={box.x}
                        y={box.y}
                        width={box.width}
                        height={box.height}
                        stroke={box.color}
                        fill={box.color}
                        onClick={onSelect}
                    />
                    {box.anchor && (
                        <React.Fragment>
                            <use xlinkHref="#anchor" x={box.x} y={box.y} />
                            <use
                                xlinkHref="#anchor"
                                x={box.x + box.width / 2}
                                y={box.y}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x + box.width}
                                y={box.y}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x + box.width}
                                y={box.y + box.height / 2}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x + box.width}
                                y={box.y + box.height}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x + box.width / 2}
                                y={box.y + box.height}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x}
                                y={box.y + box.height}
                            />
                            <use
                                xlinkHref="#anchor"
                                x={box.x}
                                y={box.y + box.height / 2}
                            />
                        </React.Fragment>
                    )}
                </g>
            ))}
        </React.Fragment>
    )
}

export default (React.memo<PropsType>(Rect): React.AbstractComponent<
    PropsType,
    mixed
>)
