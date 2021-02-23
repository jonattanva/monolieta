// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Empty from 'component/empty'
import Action from 'component/action'
import support from 'util/support'
import Folder from 'component/icon/folder'
import shortcut from 'util/shortcut'
import useKeyboard from 'hook/keyboard'
import { Context } from 'component/session'
import {
    upload,
    readJson,
    directory,
    isMonolietaFile
} from 'library/file-system'

const Option = React.lazy(() => {
    return import('view/option')
})

const Picture = React.lazy(() => {
    return import('component/picture')
})

const Virtual = React.lazy(() => {
    return import('component/virtual')
})

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

const Message = styled.div`
    align-items: center;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    display: flex;
    flex-direction: column;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
`

type PropsType = {
    onNewProject?: (Event) => void,
    onOpenProject?: (boolean, string) => void,
    onSelectedImage?: (Monolieta.Resource) => void | Promise<void>
}

const Root = (props: PropsType): React.Node => {
    const { onSelectedImage = null } = props

    const indexRef = React.useRef({})
    const { project, dispatch } = React.useContext(Context)

    const [isOption, setOption] = React.useState(false)
    const [isNewFileDisabled, setNewFileDisabled] = React.useState(true)

    const isCancelKeyPressed = useKeyboard(shortcut.escape.key)
    const isOpenProjectKeyPressed = useKeyboard(shortcut.open.key)

    React.useEffect(() => {
        if (project.key) {
            setNewFileDisabled(false)
        }
    }, [project.key, setNewFileDisabled])

    const onOptionHandle = React.useCallback(() => {
        setOption((previous) => !previous)
    }, [setOption])

    const onOutside = React.useCallback(() => {
        setOption(false)
    }, [setOption])

    const size = React.useMemo(() => {
        return { width: 120, height: 120 }
    }, [])

    const isEmpty = React.useMemo(() => {
        return project.resources?.length === 0
    }, [project.resources])

    const onNewFile = React.useCallback(async () => {
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
    }, [dispatch, project.resources, isNewFileDisabled])

    const onOpenProject = React.useCallback(async () => {
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
    }, [dispatch, props])

    const onSelected = React.useCallback(
        (id) => {
            const resources = project.resources || []
            if (resources.length === 0) {
                return
            }

            const indexed = Object.keys(indexRef.current)
            if (indexed.length > 0) {
                if (indexed.includes(id)) {
                    return
                }

                indexed.reverse().forEach((id) => {
                    const current = resources.find(
                        (resource) => resource.id === id
                    )

                    if (current) {
                        current.selected = false
                    }

                    delete indexRef.current[id]
                })
            }

            const current = resources.find((resource, index) => {
                if (resource.id === id) {
                    indexRef.current[id] = index
                    return true
                }
                return false
            })

            if (current) {
                current.selected = true

                if (onSelectedImage) {
                    onSelectedImage(current)
                }

                dispatch({
                    type: '/resource',
                    project: {
                        resources: [...resources]
                    }
                })
            }
        },
        [onSelectedImage, project.resources, dispatch]
    )

    const visibleChildren = React.useMemo(
        () =>
            project.resources?.map((resource) => (
                <Picture
                    key={resource.id}
                    id={resource.id}
                    file={resource.file}
                    selected={resource.selected}
                    onSelectedImage={onSelected}
                    {...size}
                />
            )),
        [size, project.resources, onSelected]
    )

    if (isOpenProjectKeyPressed) {
        onOpenProject()
    }

    if (isCancelKeyPressed && isOption) {
        setOption(false)
    }

    return (
        <Explorer>
            <Header>
                <Panel>
                    <Title>Project</Title>
                    <Action onClick={onOptionHandle}>
                        <Folder />
                        {isOption && (
                            <React.Suspense fallback={<Empty />}>
                                <Option
                                    onOutside={onOutside}
                                    onNewFile={onNewFile}
                                    onNewProject={props.onNewProject}
                                    onOpenProject={onOpenProject}
                                    isNewFileDisabled={isNewFileDisabled}
                                />
                            </React.Suspense>
                        )}
                    </Action>
                </Panel>
                <Name>{project.name}</Name>
            </Header>
            <Body>
                {isEmpty ? (
                    <Message>You have not yet opened a project</Message>
                ) : (
                    <React.Suspense fallback={<Empty />}>
                        <Virtual {...size} margin={4}>
                            {visibleChildren}
                        </Virtual>
                    </React.Suspense>
                )}
            </Body>
        </Explorer>
    )
}

Root.displayName = 'Explorer'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
