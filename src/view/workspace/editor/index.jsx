// @flow
import * as React from 'react'
import styled from 'styled-components'
import Empty from 'component/empty'
import Session from 'component/session'
import Explorer from 'workspace/explorer'

const Project = React.lazy(() => {
    return import('workspace/project')
})

const Editor = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
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
    background-color: var(--color-primary-panel-variant, hsl(220, 13%, 25%));
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
    background-color: var(--color-primary-panel, hsl(220, 13%, 15%));
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
    const [visible, setVisible] = React.useState<'editor' | 'project'>('editor')

    const onNewProject = React.useCallback(
        (event: Event) => {
            event.preventDefault()
            event.stopPropagation()
            setVisible('project')
        },
        [setVisible]
    )

    const onOpenProject = React.useCallback(() => {}, [])

    const onCloseProject = React.useCallback(() => {
        setVisible('editor')
    }, [setVisible])

    const onSelectedImage = React.useCallback(() => {}, [])

    const visibleChildren = React.useMemo(() => {
        switch (visible) {
            case 'project': {
                return <Project onCloseProject={onCloseProject} />
            }

            default: {
                return <div></div>
            }
        }
    }, [visible, onCloseProject])

    return (
        <Session>
            <Editor>
                <Sidebar>
                    <Explorer
                        onNewProject={onNewProject}
                        onOpenProject={onOpenProject}
                        onSelectedImage={onSelectedImage}
                    />
                </Sidebar>
                <Body>
                    <React.Suspense fallback={<Empty />}>
                        {visibleChildren}
                    </React.Suspense>
                </Body>
            </Editor>
        </Session>
    )
}

Root.displayName = 'Editor'

export default Root
