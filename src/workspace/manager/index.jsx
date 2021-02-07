// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Text from 'component/text'
import Empty from 'component/empty'
import useInputText from 'hook/input'
import Button from 'component/button'
import Action from 'component/action'
import Trash from 'component/icon/trash'
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
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    box-sizing: border-box;
    margin: 0 auto;
    width: 50%;
    will-change: transform;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 1.25em;
    font-weight: 500;
    user-select: none;
    width: 100%;
`

const Summary = styled.div`
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 16px;
    user-select: none;
    width: 100%;
`

const Row = styled.div`
    margin-bottom: 16px;
`

const Label = styled.div`
    align-items: center;
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    cursor: default;
    display: inline;
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

const Panel = styled(Row)`
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
    margin: 0 8px;
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
    padding: 0px;
`

type PropsType = {
    onCancelManager: () => void,
    onProjectCreated: () => void
}

const Root = (props: PropsType): React.Node => {
    const name = useInputText()

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
        setClasses((previous) => {
            const color = colors[Math.floor(Math.random() * colors.length)]

            return [
                ...previous,
                {
                    id: nanoid(),
                    name: '',
                    color: color,
                    checked: false
                }
            ]
        })
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
                key: nanoid(),
                name: name.value
            },
            version: 1
        }

        const blob = new Blob([JSON.stringify(workspace)], {
            type: 'application/json'
        })

        await saveFile(blob, {
            fileName: 'workspace.eva',
            extensions: ['.json', '.eva']
        })

        dispatch({
            type: '/start',
            project: workspace.project
        })

        if (props.onProjectCreated) {
            props.onProjectCreated()
        }
    }, [name.value, dispatch, props])

    return (
        <Project>
            <Body>
                <Title>New project</Title>
                <Summary>
                    Register your project name, resources and classes
                </Summary>
                <Row>
                    <Label>Name project</Label>
                    <Text {...name} />
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
                <Panel>
                    <Separator>
                        <Simple onClick={props.onCancelManager}>Cancel</Simple>
                    </Separator>
                    <Button onClick={onSave}>Create</Button>
                </Panel>
            </Body>
        </Project>
    )
}

Root.displayName = 'Manager'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)

// prettier-ignore
const colors = [
    "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350",
    "#F44336", "#E53935", "#D32F2F", "#C62828",
    "#B71C1C", "#FF8A80", "#FF5252", "#FF1744",
    "#D50000", "#F8BBD0", "#F48FB1", "#F06292",
    "#EC407A", "#E91E63", "#D81B60", "#C2185B",
    "#AD1457", "#880E4F", "#FF80AB", "#FF4081",
    "#F50057", "#C51162", "#E1BEE7", "#CE93D8",
    "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA",
    "#7B1FA2", "#6A1B9A", "#4A148C", "#EA80FC",
    "#E040FB", "#D500F9", "#AA00FF", "#B39DDB",
    "#9575CD", "#7E57C2", "#673AB7", "#5E35B1",
    "#512DA8", "#4527A0", "#311B92", "#B388FF",
    "#7C4DFF", "#651FFF", "#6200EA", "#9FA8DA",
    "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB",
    "#303F9F", "#283593", "#1A237E", "#8C9EFF",
    "#536DFE", "#3D5AFE", "#304FFE", "#BBDEFB",
    "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3",
    "#1E88E5", "#1976D2", "#1565C0", "#0D47A1",
    "#82B1FF", "#448AFF", "#2979FF", "#2962FF",
    "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6",
    "#03A9F4", "#039BE5", "#0288D1", "#0277BD",
    "#01579B", "#80D8FF", "#40C4FF", "#00B0FF",
    "#0091EA", "#B2EBF2", "#80DEEA", "#4DD0E1",
    "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7",
    "#00838F", "#006064", "#84FFFF", "#18FFFF",
    "#00E5FF", "#00B8D4", "#B2DFDB", "#80CBC4",
    "#4DB6AC", "#26A69A", "#009688", "#00897B",
    "#00796B", "#00695C", "#004D40", "#A7FFEB",
    "#64FFDA", "#1DE9B6", "#00BFA5", "#C8E6C9",
    "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50",
    "#43A047", "#388E3C", "#2E7D32", "#1B5E20",
    "#B9F6CA", "#69F0AE", "#00E676", "#00C853",
    "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65",
    "#8BC34A", "#7CB342", "#689F38", "#558B2F",
    "#33691E", "#CCFF90", "#B2FF59", "#76FF03",
    "#64DD17", "#F0F4C3", "#E6EE9C", "#DCE775",
    "#D4E157", "#CDDC39", "#C0CA33", "#AFB42B",
    "#9E9D24", "#827717", "#F4FF81", "#EEFF41",
    "#C6FF00", "#AEEA00", "#FFF9C4", "#FFF59D",
    "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835",
    "#FBC02D", "#F9A825", "#F57F17", "#FFFF8D",
    "#FFFF00", "#FFEA00", "#FFD600", "#FFECB3",
    "#FFE082", "#FFD54F", "#FFCA28", "#FFC107",
    "#FFB300", "#FFA000", "#FF8F00", "#FF6F00",
    "#FFE57F", "#FFD740", "#FFC400", "#FFAB00",
    "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726",
    "#FF9800", "#FB8C00", "#F57C00", "#EF6C00",
    "#E65100", "#FFD180", "#FFAB40", "#FF9100",
    "#FF6D00", "#FFCCBC", "#FFAB91", "#FF8A65",
    "#FF7043", "#FF5722", "#F4511E", "#E64A19",
    "#D84315", "#BF360C", "#FF9E80", "#FF6E40",
    "#FF3D00", "#DD2C00"
]
