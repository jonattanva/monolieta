// @flow
import * as React from 'react'
import styled from 'styled-components'
import Icon from 'component/icon'
import Empty from 'component/empty'
import Folder from 'component/icon/folder'
import { Session } from 'component/session'

const Dropdown = React.lazy(() => {
    return import('component/dropdown')
})

const Item = React.lazy(() => {
    return import('component/dropdown').then((module) => ({
        default: module.Item
    }))
})

const Divider = React.lazy(() => {
    return import('component/dropdown').then((module) => ({
        default: module.Divider
    }))
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
    padding: 16px 24px;
    width: 100%;
`

const Action = styled.div`
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
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
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
    onNewProject: (Event) => void,
    onOpenProject: (Event) => void,
    onSelectedImage: () => void
}

const Root = (props: PropsType): React.Node => {
    const { project } = React.useContext(Session)

    const [files, setFiles] = React.useState([])
    const [isMenu, setMenu] = React.useState(false)

    const size = React.useMemo(() => {
        return { width: 120, height: 120 }
    }, [])

    const isEmptyFile = React.useMemo(() => {
        return files.length === 0
    }, [files])

    const onMenuHandle = React.useCallback(() => {
        setMenu(true)
    }, [setMenu])

    const onOutsideTheComponent = React.useCallback(() => {
        setMenu(false)
    }, [setMenu])

    const onNewProject = React.useCallback(
        (event: Event) => {
            if (props.onNewProject) {
                setMenu(false)
                props.onNewProject(event)
            }
        },
        [props]
    )

    const onOpenProject = React.useCallback(
        (event: Event) => {
            if (props.onOpenProject) {
                setMenu(false)
                props.onOpenProject(event)
            }
        },
        [props]
    )

    const onSelectedImage = React.useCallback(
        (id) => {
            setFiles((previous) => {
                return previous.map((value) => {
                    value.selected = false
                    if (value.id === id) {
                        value.selected = true
                        if (props.onSelectedImage) {
                            props.onSelectedImage()
                        }
                    }
                    return value
                })
            })
        },
        [setFiles, props]
    )

    const onDeletedImage = React.useCallback(
        (id) => {
            setFiles((previous) => {
                return previous.filter((value) => value.id !== id)
            })
        },
        [setFiles]
    )

    const visibleChildren = React.useMemo(
        () =>
            files.map((file) => (
                <Picture
                    {...size}
                    key={file.id}
                    id={file.id}
                    image={file.file}
                    selected={file.selected}
                    onDeletedImage={onDeletedImage}
                    onSelectedImage={onSelectedImage}
                />
            )),
        [size, files, onDeletedImage, onSelectedImage]
    )

    return (
        <Explorer>
            <Header>
                <Action>
                    <Title>Project</Title>
                    <Icon onClick={onMenuHandle}>
                        <Folder />
                        {isMenu && (
                            <React.Suspense fallback={<Empty />}>
                                <Dropdown
                                    onOutsideTheComponent={
                                        onOutsideTheComponent
                                    }>
                                    <Item onClick={onNewProject}>
                                        New Project
                                    </Item>
                                    <Item onClick={onOpenProject}>
                                        Open Project
                                    </Item>
                                    <Divider />
                                </Dropdown>
                            </React.Suspense>
                        )}
                    </Icon>
                </Action>
                <Name>{project.name}</Name>
            </Header>
            <Body>
                {isEmptyFile ? (
                    <Message>You have not yet opened a folder</Message>
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
