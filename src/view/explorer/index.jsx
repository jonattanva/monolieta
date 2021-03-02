// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Resource from 'component/resource'
import support from 'util/support'
import shortcut from 'util/shortcut'
import useKeyboard from 'hook/keyboard'
import Menu from 'view/explorer/menu'
import { Context } from 'component/session'
import {
    upload,
    readJson,
    directory,
    isMonolietaFile
} from 'library/file-system'

const Explorer = styled.div`
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    box-sizing: border-box;
    min-height: 95px;
    padding: 16px 24px;
    width: 100%;
`

const Panel = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 2em;
    font-weight: 500;
    user-select: none;
    width: 100%;
`

const Name = styled.div`
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    width: 100%;
`

const Body = styled.div`
    height: calc(100% - 95px);
    width: 100%;
`

type PropsType = {
    onNewProject: (Event) => void,
    onOpenProject?: (boolean, string) => void,
    onSelectedResource?: (Monolieta.Resource) => void | Promise<void>
}

const Root = (props: PropsType): React.Node => {
    const { project, dispatch } = React.useContext(Context)

    const [isNewFileDisabled, setNewFileDisabled] = React.useState(true)

    useKeyboard(shortcut.open.key, () => {
        onOpenProject()
    })

    React.useEffect(() => {
        if (project.key) {
            setNewFileDisabled(false)
        }
    }, [project.key, setNewFileDisabled])

    const onSelecteResource = (current, resources) => {
        if (props.onSelectedResource) {
            props.onSelectedResource(current)
        }

        dispatch({
            type: '/resource',
            project: {
                resources: [...resources]
            }
        })
    }

    const onNewFile = async () => {
        if (!isNewFileDisabled) {
            const files = await upload(
                (file) => {
                    return {
                        id: nanoid(),
                        file,
                        selected: false
                    }
                },
                support,
                true
            )

            const resources = project.resources || []
            dispatch({
                type: '/resource',
                project: {
                    resources: [...resources, ...files]
                }
            })
        }
    }

    const onOpenProject = async () => {
        let setting = null
        const files = await directory((file: File) => {
            if (!support.includes(file.type)) {
                if (isMonolietaFile(file)) {
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
            if (props.onOpenProject) {
                props.onOpenProject(
                    true,
                    'Project configuration file not found'
                )
            }
            return
        }

        const workspace = await readJson(setting)
        if (!workspace) {
            if (props.onOpenProject) {
                props.onOpenProject(
                    true,
                    'Project configuration file not found'
                )
            }
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
    }

    return (
        <Explorer>
            <Header>
                <Panel>
                    <Title>Project</Title>
                    <Menu
                        onNewFile={onNewFile}
                        onNewProject={props.onNewProject}
                        onOpenProject={onOpenProject}
                        isNewFileDisabled={isNewFileDisabled}
                    />
                </Panel>
                <Name>{project.name}</Name>
            </Header>
            <Body>
                <Resource
                    dataSource={project.resources}
                    onSelecteResource={onSelecteResource}
                    message="You have not yet opened a project"
                />
            </Body>
        </Explorer>
    )
}

Root.displayName = 'Explorer'

export default Root
