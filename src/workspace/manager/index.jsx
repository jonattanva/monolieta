// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Text from 'component/text'
import useInput from 'hook/input'
import Empty from 'component/empty'
import Button from 'component/button'
import Action from 'component/action'
import Trash from 'component/icon/trash'
import { random } from 'component/color'
import { Context } from 'component/session'
import { saveFile, openDirectory } from 'library/file-system'

const Clazz = React.lazy(() => {
    return import('component/class')
})

const Picture = React.lazy(() => {
    return import('component/picture')
})

const Virtual = React.lazy(() => {
    return import('component/virtual')
})

const Project = styled.div`
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding: 16px;
    width: 100%;
    will-change: scroll-position;
`

const Body = styled.div`
    margin: 0 auto;
    width: 50%;
    will-change: transform;
`

const Medium = styled.div`
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
`

const Small = styled.div`
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 1.25em;
    font-weight: 500;
    margin-bottom: 16px;
    user-select: none;
    width: 100%;
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    width: 100%;
`

const Label = styled.div`
    align-items: center;
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    cursor: default;
    display: inline-block;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    width: 100%;
`

const Optional = styled.div`
    color: hsl(220, 13%, 50%);
    color: var(--color-font-dark, hsl(220, 13%, 50%));
    display: inline;
    font-family: Roboto, sans-serif;
    font-size: 0.75rem;
    margin-left: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`

const Warning = styled.div`
    color: #e60013;
    color: var(--color-red, #e60013);
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
`

const Interaction = styled(Row)`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const Simple = styled(Button)`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));

    &:active {
        background-color: hsl(220, 13%, 25%);
        background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    }
`

const Separator = styled.div`
    margin-right: 8px;
`

const Viewport = styled.div`
    background-color: transparent;
    height: 200px;
    margin: 8px 0;
    width: 100%;
`

const Block = styled.div`
    align-items: center;
    box-sizing: border-box;
    cursor: default;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
`

const Control = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
`

const Message = styled.div`
    align-items: center;
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    display: flex;
    flex-direction: column;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    justify-content: center;
    min-height: 200px;
    text-align: center;
    width: 100%;
`

const Scroll = styled.div`
    height: 200px;
    margin: 8px 0;
    overflow: auto;
    width: 100%;
`

const Grid = styled.div`
    box-sizing: border-box;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
`

type PropsType = {
    onCancelManager: () => void,
    onProjectCreated: () => void
}

const Root = (props: PropsType): React.Node => {
    const name = useInput()
    const id = useInput(nanoid())

    const resourcesRef = React.useRef({})
    const { dispatch } = React.useContext(Context)

    const [classes, setClasses] = React.useState([])
    const [resources, setResources] = React.useState([])
    const [isNameRequired, setNameRequired] = React.useState(false)

    const size = React.useMemo(() => {
        return { width: 130, height: 130 }
    }, [])

    const isEmptyClasses = React.useMemo(() => {
        return classes.length === 0
    }, [classes])

    const isEmptyResources = React.useMemo(() => {
        return resources.length === 0
    }, [resources])

    const onUploadResources = React.useCallback(async () => {
        resourcesRef.current = {}
        const files = await openDirectory(true, [
            'image/gif',
            'image/bmp',
            'image/jpeg',
            'image/png',
            'image/webp'
        ])

        setResources(
            files.map((file) => ({
                id: nanoid(),
                file: file,
                selected: false
            }))
        )
    }, [setResources])

    const onRemoveResource = React.useCallback(() => {
        const keys = Object.keys(resourcesRef.current)
        if (keys.length === 0) {
            return
        }

        const resources = resourcesRef.current
        setResources((previous) => {
            keys.filter((key) => resources[key])
                .reverse()
                .forEach((start) => previous.splice(Number(start), 1))

            resourcesRef.current = {}
            return [...previous]
        })
    }, [setResources])

    const onSelectedImage = React.useCallback(
        (id) => {
            setResources((previous) => {
                const index = previous.findIndex((resource) => {
                    return resource.id === id
                })

                const resource = previous[index]
                if (resource) {
                    resource.selected = !resource.selected
                    resourcesRef.current[index] = resource.selected
                    return [...previous]
                }

                return previous
            })
        },
        [setResources]
    )

    const visibleResources = React.useMemo(
        () =>
            resources.map((file) => (
                <Picture
                    {...size}
                    key={file.id}
                    id={file.id}
                    image={file.file}
                    selected={file.selected}
                    onSelectedImage={onSelectedImage}
                />
            )),
        [resources, size, onSelectedImage]
    )

    const onNewClass = React.useCallback(() => {
        setClasses((previous) => [
            ...previous,
            {
                id: nanoid(),
                name: '',
                color: random(Array.from(previous, (value) => value.color)),
                checked: false
            }
        ])
    }, [setClasses])

    const onSavedColor = React.useCallback(
        (id, color) => {
            setClasses((previous) => {
                const clazz = previous.find((clazz) => {
                    return clazz.id === id
                })

                if (clazz) {
                    clazz.color = color
                    return [...previous]
                }

                return previous
            })
        },
        [setClasses]
    )

    const onSelectedClass = React.useCallback(
        (id, checked) => {
            setClasses((previous) => {
                const clazz = previous.find((clazz) => {
                    return clazz.id === id
                })

                if (clazz) {
                    clazz.checked = checked
                    return [...previous]
                }

                return previous
            })
        },
        [setClasses]
    )

    const onSelectedName = React.useCallback(
        (id, name) => {
            setClasses((previous) => {
                const clazz = previous.find((clazz) => {
                    return clazz.id === id
                })

                if (clazz) {
                    clazz.name = name
                    return [...previous]
                }

                return previous
            })
        },
        [setClasses]
    )

    const onRemoveClasses = React.useCallback(() => {
        setClasses((previous) => {
            return previous.filter((clazz) => {
                return !clazz.checked
            })
        })
    }, [])

    const visibleClasses = React.useMemo(() => {
        return classes.map((clazz) => (
            <Clazz
                key={clazz.id}
                id={clazz.id}
                name={clazz.name}
                color={clazz.color}
                autoPosition={true}
                checked={clazz.checked}
                onSavedColor={onSavedColor}
                onSelectedClass={onSelectedClass}
                onSelectedName={onSelectedName}
            />
        ))
    }, [classes, onSavedColor, onSelectedClass, onSelectedName])

    const onSave = React.useCallback(async () => {
        if (!name.value) {
            setNameRequired(true)
            return
        }

        const workspace = {
            project: {
                key: id.value,
                name: name.value
            },
            classes: classes
                .filter((clazz) => clazz.name !== '')
                .map((clazz) => ({
                    id: clazz.id,
                    name: clazz.name,
                    color: clazz.color
                })),
            version: 1
        }

        const blob = new Blob([JSON.stringify(workspace)], {
            type: 'application/json'
        })

        await saveFile(blob, {
            filename: 'workspace.eva',
            extensions: ['.json', '.eva']
        })

        dispatch({
            type: '/start',
            project: {
                ...workspace.project,
                resources: resources.map((resource) => ({
                    id: resource.id,
                    file: resource.file
                })),
                classes: workspace.classes
            }
        })

        if (props.onProjectCreated) {
            props.onProjectCreated()
        }
    }, [id.value, name.value, resources, classes, dispatch, props])

    return (
        <Project>
            <Body>
                <Title>New project</Title>
                <Row>
                    <Medium>
                        <Separator>
                            <Label>Name project</Label>
                            <Text {...name} autofocus={true} cy="name" />
                        </Separator>
                    </Medium>
                    <Small>
                        <Label>Project ID</Label>
                        <Text {...id} readonly={true} cy="id" />
                    </Small>
                    {isNameRequired && (
                        <Warning>The project name is required</Warning>
                    )}
                </Row>
                <Row>
                    <Block>
                        <Label>
                            Import resources for the datase
                            <Optional>(optional)</Optional>
                        </Label>
                        <Control>
                            <Separator>
                                <Action onClick={onRemoveResource}>
                                    <Trash />
                                </Action>
                            </Separator>
                            <Simple onClick={onUploadResources}>Upload</Simple>
                        </Control>
                    </Block>
                    <Viewport>
                        {isEmptyResources ? (
                            <Message>
                                No resources have been included in the dataset
                            </Message>
                        ) : (
                            <React.Suspense fallback={<Empty />}>
                                <Virtual {...size} margin={4}>
                                    {visibleResources}
                                </Virtual>
                            </React.Suspense>
                        )}
                    </Viewport>
                </Row>
                <Row>
                    <Block>
                        <Label>
                            Import classes for the datase
                            <Optional>(optional)</Optional>
                        </Label>
                        <Control>
                            <Separator>
                                <Action onClick={onRemoveClasses}>
                                    <Trash />
                                </Action>
                            </Separator>
                            <Simple onClick={onNewClass}>New class</Simple>
                        </Control>
                    </Block>
                    <Scroll>
                        {isEmptyClasses ? (
                            <Message>
                                No classes have been included in the dataset
                            </Message>
                        ) : (
                            <React.Suspense fallback={<Empty />}>
                                <Grid>{visibleClasses}</Grid>
                            </React.Suspense>
                        )}
                    </Scroll>
                </Row>
                <Interaction>
                    <Separator>
                        <Simple onClick={props.onCancelManager}>Cancel</Simple>
                    </Separator>
                    <Button onClick={onSave} cy="create">
                        Create
                    </Button>
                </Interaction>
            </Body>
        </Project>
    )
}

Root.displayName = 'Manager'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
