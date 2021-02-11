// @flow
import * as React from 'react'

type PropsType = {
    ascending?: boolean,
    height?: number,
    width?: number
}

const Root = (props: PropsType): React.Node => (
    <svg
        fill="none"
        role="icon"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={props.width}
        height={props.height}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
                props.ascending
                    ? 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
                    : 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
            }
        />
    </svg>
)

Root.displayName = 'Sort'

Root.defaultProps = {
    ascending: true,
    height: 24,
    width: 24
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
