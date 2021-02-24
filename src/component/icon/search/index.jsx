// @flow
import * as React from 'react'

type PropsType = {
    width?: number,
    height?: number
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
)

Root.displayName = 'Search'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default Root
