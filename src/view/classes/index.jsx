// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import Label from 'component/label'
import Action from 'component/action'
import Button from 'component/button'
import Search from 'component/search'
import Sort from 'component/icon/sort'
import Trash from 'component/icon/trash'
import useMouseOutside from 'hook/outside'
import { random } from 'component/color'
import { Context } from 'component/session'

const Body = styled.div`
    position: absolute;
    right: 16px;
    top: 0;
    z-index: 100;
`

const Sidebar = styled.div`
    background-color: hsl(220, 13%, 25%);
    background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    border-radius: 4px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    min-width: 320px;
    padding: 16px;
    position: absolute;
    right: 48px;
    top: 100%;
    user-select: none;
    width: 320px;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    width: 100%;
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    width: 100%;
`

const Summary = styled.div`
    color: hsl(219, 13%, 65%);
    color: var(--color-font-light, hsl(219, 13%, 65%));
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
    width: 100%;
`

const Group = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

const Separator = styled.div`
    margin-left: 8px;
`

const Control = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

const Scroll = styled.div`
    max-height: 350px;
    overflow: auto;
    width: 100%;
`

const sort = (first: string, second: string, ascending: boolean = true) => {
    return ascending ? first.localeCompare(second) : second.localeCompare(first)
}

type PropsType = {
    onOutside?: () => void
}

const Root = (props: PropsType): React.Node => {
    const classRef = React.useRef()
    const { project, dispatch } = React.useContext(Context)

    const [classes, setClasses] = React.useState([])
    const [ascending, setAscending] = React.useState(true)

    useMouseOutside(classRef, () => {
        if (props.onOutside) {
            props.onOutside()
        }
    })

    React.useEffect(() => {
        if (project.classes) {
            setClasses(project.classes)
        }
    }, [project.classes])

    React.useEffect(() => {
        setClasses((previous) => {
            return [
                ...previous.sort((first, second) =>
                    sort(first.name, second.name, ascending)
                )
            ]
        })
    }, [ascending])

    const onSort = React.useCallback(() => {
        setAscending((previous) => !previous)
    }, [])

    const onSearch = React.useCallback(
        (value) => {
            if (project.classes?.length === 0) {
                return
            }

            const criteria = value.toLowerCase()
            if (project.classes) {
                if (!criteria) {
                    setClasses(project.classes)
                    return
                }

                setClasses(
                    project.classes.filter(({ name }) => {
                        return name.toLowerCase().includes(criteria)
                    })
                )
            }
        },
        [project.classes]
    )

    const onNewClass = React.useCallback(() => {
        const id = nanoid()
        const color = random(
            Array.from(classes, (value) => {
                return value.color
            })
        )

        dispatch({
            type: '/class',
            project: {
                classes: [
                    {
                        id,
                        name: '',
                        color,
                        selected: false
                    },
                    ...classes
                ]
            }
        })
    }, [classes, dispatch])

    const onRemoveClass = React.useCallback(() => {
        dispatch({
            type: '/class',
            project: {
                classes: classes.filter((value) => {
                    return !value.selected
                })
            }
        })
    }, [classes, dispatch])

    const onSelectedClass = React.useCallback(
        (id, selected) => {
            const current = classes?.find((value) => {
                return value.id === id
            })

            if (current) {
                current.selected = selected

                dispatch({
                    type: '/class',
                    project: {
                        classes: [...classes]
                    }
                })
            }
        },
        [classes, dispatch]
    )

    const onSavedColor = React.useCallback(
        (id, color) => {
            const current = classes?.find((value) => {
                return value.id === id
            })

            if (current) {
                current.color = color

                dispatch({
                    type: '/class',
                    project: {
                        classes: [...classes]
                    }
                })
            }
        },
        [classes, dispatch]
    )

    const onSelectedName = React.useCallback(
        (id, name) => {
            const current = classes?.find((value) => {
                return value.id === id
            })

            if (current) {
                current.name = name

                dispatch({
                    type: '/class',
                    project: {
                        classes: [...classes]
                    }
                })
            }
        },
        [classes, dispatch]
    )

    const visible = React.useMemo(() => {
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
    }, [classes, onSavedColor, onSelectedName, onSelectedClass])

    return (
        <Body ref={classRef}>
            <Sidebar>
                <Title>Class manager</Title>
                <Row>
                    <Summary>Filters</Summary>
                    <Group>
                        <Search onChange={onSearch} />
                        <Separator>
                            <Action onClick={onSort}>
                                <Sort ascending={ascending} />
                            </Action>
                        </Separator>
                    </Group>
                </Row>
                <Row>
                    <Group>
                        <Summary>Classes</Summary>
                        <Control>
                            <Action onClick={onRemoveClass}>
                                <Trash />
                            </Action>
                            <Separator>
                                <Button onClick={onNewClass}>New class</Button>
                            </Separator>
                        </Control>
                    </Group>
                </Row>
                <Scroll>{visible}</Scroll>
            </Sidebar>
        </Body>
    )
}

Root.displayName = 'Classes'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
