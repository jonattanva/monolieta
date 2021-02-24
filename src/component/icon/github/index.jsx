// @flow
import * as React from 'react'
import styled from 'styled-components'

const Link = styled.a`
    align-items: center;
    display: flex;
    justify-content: center;
`

type PropsType = {
    url: string
}

const Root = (props: PropsType): React.Node => {
    return (
        <Link href={props.url} rel="noopener noreferrer" target="_blank">
            <img src="image/github/icon.png" width={20} height={20} />
        </Link>
    )
}

Root.displayName = 'Github'

export default Root
