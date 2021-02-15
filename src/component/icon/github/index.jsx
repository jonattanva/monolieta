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
            <img src="image/github/icon.png" width={24} height={24} />
        </Link>
    )
}

Root.displayName = 'Github'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
