// @flow
import * as React from 'react'
import { nanoid } from 'nanoid'
import Action from 'component/action'
import Button from 'component/button'
import Label from 'component/label'
import Search from 'component/search'
import Sidebar from 'component/sidebar'
import Sort from 'component/icon/sort'
import Trash from 'component/icon/trash'
import shortcut from 'util/shortcut'
import sort from 'util/sort'
import styled from 'styled-components'
import useKeyboard from 'hook/keyboard'
import useMouseOutside from 'hook/outside'
import { random } from 'component/color'
import { Context } from 'component/session'

const Body = styled.div`
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 100;
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    width: 100%;
`

const Summary = styled.div`
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

type PropsType = {
    onClose?: () => void
}

const Root = (props: PropsType): React.Node => {
    const classRef = React.useRef()
    const { project, dispatch } = React.useContext(Context)

    const [classes, setClasses] = React.useState([])
    const [ascending, setAscending] = React.useState(true)

    React.useEffect(() => {
        if (project.classes) {
            setClasses(project.classes)
        }
    }, [project.classes])

    React.useEffect(() => {
        setClasses((previous) => {
            if (previous?.length <= 1) {
                return previous
            }

            return [
                ...previous.sort((first, second) => {
                    return sort(first.name, second.name, ascending)
                })
            ]
        })
    }, [ascending])

    useMouseOutside(classRef, () => {
        if (props.onClose) {
            props.onClose()
        }
    })

    useKeyboard(shortcut.escape.key, () => {
        if (props.onClose) {
            props.onClose()
        }
    })

    const onSort = () => {
        setAscending((previous) => !previous)
    }

    const onSearch = (value) => {
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
    }

    const onNewClass = () => {
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
    }

    const onRemoveClass = () => {
        if (classes.length === 0) {
            return
        }

        const selected = classes.find((value) => value.selected)
        if (!selected) {
            return
        }

        dispatch({
            type: '/class',
            project: {
                classes: classes.filter((value) => {
                    return !value.selected
                })
            }
        })
    }

    const onSelectedClass = (id, selected) => {
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
    }

    const onSavedColor = (id, color) => {
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
    }

    const onSelectedName = (id, name) => {
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
    }

    const visible = classes.map((value, index) => (
        <Label
            key={value.id}
            id={value.id}
            name={value.name}
            color={value.color}
            autoPosition={true}
            autofocus={index === 0}
            selected={value.selected}
            onSavedColor={onSavedColor}
            onSelectedName={onSelectedName}
            onSelectedClass={onSelectedClass}
        />
    ))

    return (
        <Body ref={classRef}>
            <Sidebar title="Class manager">
                <Row>
                    <Summary>Filters</Summary>
                    <Group>
                        <Search onChange={onSearch} />
                        <Separator>
                            <Action
                                onClick={onSort}
                                title={`Sort - ${
                                    ascending ? 'ascending' : 'descending'
                                }`}
                                cy={
                                    process.env.NODE_ENV === 'development'
                                        ? 'sort'
                                        : null
                                }>
                                <Sort ascending={ascending} />
                            </Action>
                        </Separator>
                    </Group>
                </Row>
                <Row>
                    <Group>
                        <Summary>Classes</Summary>
                        <Control>
                            <Action
                                onClick={onRemoveClass}
                                cy={
                                    process.env.NODE_ENV === 'development'
                                        ? 'trash'
                                        : null
                                }>
                                <Trash />
                            </Action>
                            <Separator>
                                <Button onClick={onNewClass}>New class</Button>
                            </Separator>
                        </Control>
                    </Group>
                </Row>
                <Scroll role="classes">{visible}</Scroll>
            </Sidebar>
        </Body>
    )
}

Root.displayName = 'Classes'

export default Root
