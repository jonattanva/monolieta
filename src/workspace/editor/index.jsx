// @flow
import * as React from 'react'
import styled from 'styled-components'
import Empty from 'component/empty'
import Explorer from 'workspace/explorer'
import { Context } from 'component/session'

const Manager = React.lazy(() => {
    return import('workspace/manager')
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
    const { project, dispatch } = React.useContext(Context)

    const [message, setMessage] = React.useState('')
    const [isManager, setManager] = React.useState(false)

    const onHideMessage = React.useCallback(() => {
        setMessage('')
    }, [setMessage])

    const onOpenProject = React.useCallback(() => {
        /*
        import('browser-fs-access').then(async ({ fileOpen }) => {
            const blob = await fileOpen({
                mimeTypes: ['application/json'],
                extensions: ['.eva']
            })

            const reader = new FileReader()
            reader.addEventListener('load', (event: any) => {
                const workspace = JSON.parse(event.target.result)
                if (!workspace || !workspace.project) {
                    setMessage('Could not read the configuration file')
                    return
                }

                dispatch({
                    type: '/start',
                    project: workspace.project
                })
            })
            reader.readAsText(blob)
        })
        */
    }, [setMessage, dispatch])

    const onNewProject = React.useCallback(() => {
        setManager(true)
    }, [setManager])

    const onCancelManager = React.useCallback(() => {
        setManager(false)
    }, [setManager])

    const onNewFile = React.useCallback(() => {
        /*
        import('browser-fs-access').then(async ({ directoryOpen }) => {
            const blobs = await directoryOpen({
                recursive: true
            })

            console.log(blobs)
        })
        */
    }, [])

    return (
        <Editor>
            <Sidebar>
                <Explorer
                    onNewFile={onNewFile}
                    onNewProject={onNewProject}
                    onOpenProject={onOpenProject}
                    project={project.name}
                />
            </Sidebar>
            <Body>
                <React.Suspense fallback={<Empty />}>
                    {isManager && (
                        <Manager
                            onCancelManager={onCancelManager}
                            onProjectCreated={onCancelManager}
                        />
                    )}
                </React.Suspense>
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
