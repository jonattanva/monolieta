// @flow
import * as React from 'react'
import styled from 'styled-components'
import Empty from 'component/empty'
import Explorer from 'view/explorer'
import shortcut from 'util/shortcut'
import useKeyboard from 'hook/keyboard'
import Label from 'component/icon/label'
import Github from 'component/icon/github'
import Navigation, { Access } from 'component/navigation'

const Classes = React.lazy(() => {
    return import('view/classes')
})

const Manager = React.lazy(() => {
    return import('view/manager')
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
    align-items: center;
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
    justify-content: center;
    min-width: 0;
    width: 100%;
`

const Root = (): React.Node => {
    const [message, setMessage] = React.useState('')
    const [isClassManager, setClassManager] = React.useState(false)
    const [isProjectManager, setProjectManager] = React.useState(false)

    const isCancelKeyPressed = useKeyboard(shortcut.escape.key)

    if (isCancelKeyPressed) {
        if (isClassManager) {
            setClassManager(false)
        }

        if (isProjectManager) {
            setProjectManager(false)
        }
    }

    const onHideMessage = React.useCallback(() => {
        setMessage('')
    }, [setMessage])

    const onProjectManager = React.useCallback(() => {
        setProjectManager(true)
    }, [setProjectManager])

    const onCancelManager = React.useCallback(() => {
        setProjectManager(false)
    }, [setProjectManager])

    const onClassManager = React.useCallback(() => {
        setClassManager((previous) => !previous)
    }, [])

    const onOpenProject = React.useCallback((error, message) => {
        if (error) {
            setMessage(message)
        }
    }, [])

    const onSelectedImage = React.useCallback((resource) => {
        console.log('resource', resource)
    }, [])

    return (
        <Editor>
            <Sidebar>
                <Explorer
                    onNewProject={onProjectManager}
                    onOpenProject={onOpenProject}
                    onSelectedImage={onSelectedImage}
                />
            </Sidebar>
            <Body>
                <React.Suspense fallback={<Empty />}>
                    {isProjectManager && (
                        <Manager
                            onCancelManager={onCancelManager}
                            onProjectCreated={onCancelManager}
                        />
                    )}
                </React.Suspense>
            </Body>
            {!isProjectManager && (
                <Navigation>
                    <Access title="Classes">
                        <Label onClick={onClassManager} />
                        {isClassManager && (
                            <React.Suspense fallback={<Empty />}>
                                <Classes onOutside={onClassManager} />
                            </React.Suspense>
                        )}
                    </Access>
                    <Access>
                        <Github url="https://github.com/jonattanva/monolieta" />
                    </Access>
                </Navigation>
            )}
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
