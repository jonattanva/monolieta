// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Empty from 'component/empty'
import support from 'library/support'
import Explorer from 'workspace/explorer'
import { Context } from 'component/session'
import { directory, readFile } from 'library/file-system'

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

const read = async (file) => {
    try {
        return JSON.parse(await readFile(file))
    } catch {
        return null
    }
}

const Root = (): React.Node => {
    const { project, dispatch } = React.useContext(Context)

    const [message, setMessage] = React.useState('')
    const [isProjectManager, setProjectManager] = React.useState(false)

    const onHideMessage = React.useCallback(() => {
        setMessage('')
    }, [setMessage])

    const onOpenProject = React.useCallback(async () => {
        let setting = null
        const files = await directory((file: File) => {
            if (!support.includes(file.type)) {
                const extension = file.name.split('.').pop()
                if (extension === 'eva') {
                    setting = file
                }
                return null
            }

            return {
                id: nanoid(),
                file,
                selected: false
            }
        })

        if (!setting) {
            setMessage('Project configuration file not found')
            return
        }

        const workspace = await read(setting)
        if (!workspace) {
            setMessage('Project configuration file not found')
            return
        }

        dispatch({
            type: '/start',
            project: {
                ...workspace.project,
                resources: files,
                classes: workspace.classes
            }
        })
    }, [dispatch])

    const onNewProject = React.useCallback(() => {
        setProjectManager(true)
    }, [setProjectManager])

    const onCancelManager = React.useCallback(() => {
        setProjectManager(false)
    }, [setProjectManager])

    const onNewFile = React.useCallback(() => {}, [])

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
                    {isProjectManager && (
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
