// @flow
import * as React from 'react'
import styled from 'styled-components'
import Adjustments from 'component/icon/adjustments'
import Archive from 'component/icon/archive'
import Canvas from 'component/canvas'
import Cube from 'component/icon/cube'
import Cursor from 'component/icon/cursor'
import Empty from 'component/empty'
import Explorer from 'view/explorer'
import Github from 'component/icon/github'
import Hand from 'component/icon/hand'
import Label from 'component/icon/label'
import Rect from 'component/icon/rect'
import Navigation, { Access } from 'component/navigation'
import { readImage } from 'library/file-system'

const Classes = React.lazy(() => {
    return import('view/classes')
})

const Snackbar = React.lazy(() => {
    return import('component/snackbar')
})

const Editor = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    height: 100vh;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100vw;
`

const Sidebar = styled.div`
    align-items: stretch;
    background-color: hsl(220, 13%, 25%);
    background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    min-width: 300px;
    width: 300px;
`

const Body = styled.div`
    align-content: center;
    align-items: flex-start;
    align-self: stretch;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: flex-start;
    min-width: 0;
    width: 100%;
`

const Layer = styled.div`
    align-content: center;
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: center;
    width: 100%;
`

const Content = styled.div`
    align-self: flex-start;
    display: flex;
`

const Root = (): React.Node => {
    const [message, setMessage] = React.useState('')
    const [current, setCurrent] = React.useState(null)

    const [isGroupManager, setGroupManager] = React.useState(false)
    const [isClassManager, setClassManager] = React.useState(false)
    const [isProjectManager, setProjectManager] = React.useState(false)

    const onClassManager = () => {
        setClassManager((previous) => !previous)
    }

    const onNewProject = () => {
        setProjectManager(true)
    }

    const onOpenProject = (error, message) => {
        if (error) {
            setMessage(message)
        }
    }

    const onHideMessage = () => {
        setMessage('')
    }

    const onSelectedImage = async (resource) => {
        const file = await readImage(resource.file)
        setCurrent({
            id: resource.id,
            file
        })
    }

    return (
        <Editor>
            <Sidebar>
                <Explorer
                    onNewProject={onNewProject}
                    onOpenProject={onOpenProject}
                    onSelectedImage={onSelectedImage}
                />
            </Sidebar>
            <Body>
                <Navigation orientation="vertical">
                    <Access>
                        <Cursor />
                    </Access>
                    <Access>
                        <Hand />
                    </Access>
                    <Access>
                        <Rect />
                    </Access>
                    <Access>
                        <Cube />
                    </Access>
                </Navigation>
                <Layer>
                    <Canvas />
                    <Content>
                        <Navigation orientation="horizontal">
                            <Access title="Groups">
                                <Archive />
                            </Access>
                            <Access title="Adjustments">
                                <Adjustments />
                            </Access>
                            <Access
                                title="Labels"
                                onClick={onClassManager}
                                data-cy={
                                    process.env.NODE_ENV === 'development'
                                        ? 'label'
                                        : null
                                }>
                                <Label />
                            </Access>
                            <Access>
                                <Github url="https://github.com/jonattanva/monolieta" />
                            </Access>
                        </Navigation>
                        <React.Suspense fallback={<Empty />}>
                            {isClassManager && (
                                <Classes onClose={onClassManager} />
                            )}
                        </React.Suspense>
                    </Content>
                </Layer>
            </Body>
            {message && (
                <React.Suspense fallback={<Empty />}>
                    <Snackbar delay={5000} onClose={onHideMessage}>
                        {message}
                    </Snackbar>
                </React.Suspense>
            )}
        </Editor>
    )
}

Root.displayName = 'Editor'

export default Root
