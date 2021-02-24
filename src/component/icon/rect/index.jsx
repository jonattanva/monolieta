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
        height={props.height}></svg>
)

Root.displayName = 'Rect'

Root.defaultProps = {
    width: 24,
    height: 24
}

export default Root
