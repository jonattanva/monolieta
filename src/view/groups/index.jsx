//@flow
import * as React from 'react'
import styled from 'styled-components'
import Sidebar from 'component/sidebar'
import Group from 'component/group'
import useMouseOutside from 'hook/outside'
import { Context } from 'component/session'

const Body = styled.div`
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 100;
`

const Scroll = styled.div`
    margin-top: 16px;
    max-height: 400px;
    overflow: auto;
    width: 100%;
`

type PropsType = {
    onOutside?: () => void
}

const Root = (props: PropsType): React.Node => {
    const groupRef = React.useRef()
    const { project } = React.useContext(Context)

    useMouseOutside(groupRef, () => {
        if (props.onOutside) {
            props.onOutside()
        }
    })

    const visible = React.useMemo(() => {
        return <Group classes={project.classes} />
    }, [project.classes])

    return (
        <Body ref={groupRef}>
            <Sidebar title="Group manager">
                <Scroll>{visible}</Scroll>
            </Sidebar>
        </Body>
    )
}

Root.displayName = 'Groups'

export default Root
