// @flow
import * as React from 'react'

type PropsType = {
    width?: number,
    height?: number
}

const Root = (props: PropsType): React.Node => (
    <svg
        role="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={props.width}
        height={props.height}>
        <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
    </svg>
)

Root.displayName = 'Cube'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default Root
