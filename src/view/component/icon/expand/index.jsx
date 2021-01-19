// @flow
import * as React from 'react'

type PropsType = {
    open?: boolean,
    width?: number,
    height?: number
}

const Root = (props: PropsType): React.Node => (
    <svg
        role="icon"
        fill="none"
        width={props.width}
        height={props.height}
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={!props.open ? 'M9 5l7 7-7 7' : 'M19 9l-7 7-7-7'}
        />
    </svg>
)

Root.displayName = 'Expand'

Root.defaultProps = {
    open: false,
    width: 24,
    height: 24
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
