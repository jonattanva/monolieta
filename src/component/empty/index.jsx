//@flow
import * as React from 'react'
import styled from 'styled-components'

const Empty: React.ComponentType<{}> = styled.div.attrs({
    role: 'empty'
})`
    display: none;
`

export default Empty
