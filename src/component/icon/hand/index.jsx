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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
        />
    </svg>
)

Root.displayName = 'Hand'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default Root
