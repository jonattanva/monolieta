// @flow
import * as React from 'react'

type PropsType = {
    width?: number,
    height?: number,
    onClick?: (Event) => void
}

const Root = (props: PropsType): React.Node => (
    <svg
        fill="none"
        role="icon"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={props.width}
        height={props.height}
        onClick={props.onClick}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
    </svg>
)

Root.displayName = 'Search'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default Root
