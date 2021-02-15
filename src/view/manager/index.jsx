// @flow
import * as Monolieta from 'Monolieta'
import * as React from 'react'
import styled from 'styled-components'
import { nanoid } from 'nanoid'
import Text from 'component/text'
import useInput from 'hook/input'
import Action from 'component/action'
import support from 'util/support'
import Button from 'component/button'
import Trash from 'component/icon/trash'
import { random } from 'component/color'
import { Context } from 'component/session'
import { saveFile, directory } from 'library/file-system'
import Virtual from 'component/virtual'
import Picture from 'component/picture'
import Label from 'component/label'

const Medium = styled.div`
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
`

const Small = styled.div`
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
`

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

const Title = styled.div`
    border-bottom: 1px solid hsl(220, 13%, 25%);
    border-bottom: 1px solid var(--color-secondary-light, hsl(220, 13%, 25%));
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 1.25em;
    font-weight: 500;
    margin-bottom: 16px;
    padding-bottom: 8px;
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

const Group = styled.div`
    align-items: center;
    box-sizing: border-box;
    cursor: default;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
`

const Scroll = styled.div`
    height: 200px;
    margin: 8px 0;
    overflow: auto;
    width: 100%;
`

const Interaction = styled(Row)`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const Separator = styled.div`
    margin-right: 8px;
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

const Grid = styled.div`
    box-sizing: border-box;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
`

const Summary = styled.div`
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

const Required = styled(Summary)`
    &:after {
        color: #e60013;
        color: var(--color-red, #e60013);
        content: '*';
        padding-left: 4px;
    }
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

const Control = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
`

const Simple = styled(Button)`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-secondary, hsl(220, 13%, 15%));

    &:active {
        background-color: hsl(220, 13%, 25%);
        background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    }
`

const Division = styled.div`
    border-bottom: 1px solid hsl(220, 13%, 25%);
    border-bottom: 1px solid var(--color-secondary-light, hsl(220, 13%, 25%));
    padding-bottom: 16px;
    width: 100%;
`

const Viewport = styled.div`
    height: 200px;
    margin: 8px 0;
    width: 100%;
`

const Warning = styled.div`
    color: #e60013;
    color: var(--color-red, #e60013);
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
`

type PropsType = {
    onCancelManager?: (Event) => void,
    onProjectCreated?: (Event) => void
}

const Root = (props: PropsType): React.Node => {
    const name = useInput()
    const id = useInput(nanoid())

    const resourcesRef = React.useRef({})
    const { dispatch } = React.useContext(Context)

    const [isNameRequired, setNameRequired] = React.useState(false)
    const [classes, setClasses] = React.useState<Array<Monolieta.Label>>([])
    const [resources, setResources] = React.useState<Array<Monolieta.Resource>>(
        []
    )

    const size = React.useMemo(() => {
        return { width: 130, height: 130 }
    }, [])

    const isEmptyClasses = React.useMemo(() => {
        return classes.length === 0
    }, [classes])

    const isEmptyResources = React.useMemo(() => {
        return resources.length === 0
    }, [resources])

    const onNewClass = React.useCallback(() => {
        setClasses((previous) => {
            const id = nanoid()
            const color = random(
                Array.from(previous, (value) => {
                    return value.color
                })
            )

            return [
                ...previous,
                {
                    id,
                    name: '',
                    color,
                    selected: false
                }
            ]
        })
    }, [setClasses])

    const onRemoveClasses = React.useCallback(() => {
        setClasses((previous) => {
            return previous.filter((value) => !value.selected)
        })
    }, [])

    const onSelectedClass = React.useCallback((id, selected) => {
        setClasses((previous) => {
            const current = previous.find((value) => {
                return value.id === id
            })

            if (current) {
                current.selected = selected
                return [...previous]
            }

            return previous
        })
    }, [])

    const onSavedColor = React.useCallback(
        (id, color) => {
            setClasses((previous) => {
                const current = previous.find((value) => {
                    return value.id === id
                })

                if (current) {
                    current.color = color
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
                const current = previous.find((value) => {
                    return value.id === id
                })

                if (current) {
                    current.name = name
                    return [...previous]
                }

                return previous
            })
        },
        [setClasses]
    )

    const onUploadResources = React.useCallback(async () => {
        resourcesRef.current = {}
        setResources(
            await directory<Monolieta.Resource>((file: File) => {
                if (!support.includes(file.type)) {
                    return null
                }

                return {
                    id: nanoid(),
                    file,
                    selected: false
                }
            })
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

    const onSelectedResource = React.useCallback(
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

    const visibleClasses = React.useMemo(() => {
        return classes.map((value) => (
            <Label
                key={value.id}
                id={value.id}
                name={value.name}
                color={value.color}
                selected={value.selected}
                autoPosition={true}
                onSavedColor={onSavedColor}
                onSelectedName={onSelectedName}
                onSelectedClass={onSelectedClass}
            />
        ))
    }, [classes, onSavedColor, onSelectedClass, onSelectedName])

    const visibleResources = React.useMemo(() => {
        return resources.map((resource) => {
            return (
                <Picture
                    key={resource.id}
                    id={resource.id}
                    file={resource.file}
                    selected={resource.selected}
                    onSelectedImage={onSelectedResource}
                    {...size}
                />
            )
        })
    }, [resources, size, onSelectedResource])

    const onSave = React.useCallback(
        async (event) => {
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
                    .filter((clazz) => clazz.name.trim() !== '')
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
                props.onProjectCreated(event)
            }
        },
        [id.value, name.value, resources, classes, dispatch, props]
    )

    return (
        <Project>
            <Body>
                <Title>New project</Title>
                <Row>
                    <Medium>
                        <Separator>
                            <Required>Name project</Required>
                            <Text {...name} autofocus={true} />
                        </Separator>
                    </Medium>
                    <Small>
                        <Summary>Project ID</Summary>
                        <Text {...id} readonly={true} />
                    </Small>
                    {isNameRequired && (
                        <Warning>The project name is required</Warning>
                    )}
                    <Division />
                </Row>
                <Row>
                    <Group>
                        <Summary>
                            Import resources for the datase
                            <Optional>(optional)</Optional>
                        </Summary>
                        <Control>
                            <Separator>
                                <Action onClick={onRemoveResource}>
                                    <Trash />
                                </Action>
                            </Separator>
                            <Simple onClick={onUploadResources}>Upload</Simple>
                        </Control>
                    </Group>
                    <Viewport>
                        {isEmptyResources ? (
                            <Message>
                                No resources have been included in the dataset
                            </Message>
                        ) : (
                            <Virtual {...size} margin={4}>
                                {visibleResources}
                            </Virtual>
                        )}
                    </Viewport>
                    <Division />
                </Row>
                <Row>
                    <Group>
                        <Summary>
                            Import classes for the datase
                            <Optional>(optional)</Optional>
                        </Summary>
                        <Control>
                            <Separator>
                                <Action onClick={onRemoveClasses}>
                                    <Trash />
                                </Action>
                            </Separator>
                            <Simple onClick={onNewClass}>New class</Simple>
                        </Control>
                    </Group>
                    <Scroll>
                        {isEmptyClasses ? (
                            <Message>
                                No classes have been included in the dataset
                            </Message>
                        ) : (
                            <Grid>{visibleClasses}</Grid>
                        )}
                    </Scroll>
                    <Division />
                </Row>
                <Interaction>
                    <Separator>
                        <Simple onClick={props.onCancelManager}>Cancel</Simple>
                    </Separator>
                    <Button onClick={onSave}>Create project</Button>
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
