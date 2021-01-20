// @flow
import * as React from 'react'
import styled from 'styled-components'

type PropsType = {

}

const Root = (props: PropsType): React.Node => {
    return (<div></div>)
}

Root.displayName = 'Explorer'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
