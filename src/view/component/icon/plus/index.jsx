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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
    </svg>
)

Root.displayName = 'Plus'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
