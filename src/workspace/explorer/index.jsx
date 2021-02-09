// @flow
import * as React from 'react'
import styled from 'styled-components'
import Empty from 'component/empty'
import Action from 'component/action'
import Folder from 'component/icon/folder'
import { Context } from 'component/session'

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

const Shortcut = React.lazy(() => {
    return import('component/dropdown').then((module) => ({
        default: module.Shortcut
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
    onOpenProject?: (Event) => void | Promise<void>,
    onNewFile?: (Event) => void,
    project: string
}

const Root = (props: PropsType): React.Node => {
    const { project } = React.useContext(Context)

    const [isOption, setOption] = React.useState(false)
    const [isNewFileDisabled, setNewFileDisabled] = React.useState(true)

    React.useEffect(() => {
        if (project.key) {
            setNewFileDisabled(false)
        }
    }, [project.key, setNewFileDisabled])

    const onNewFile = React.useCallback(
        (event) => {
            if (!isNewFileDisabled && props.onNewFile) {
                props.onNewFile(event)
            }
        },
        [isNewFileDisabled, props]
    )

    const onOptionHandle = React.useCallback(() => {
        setOption((previous) => !previous)
    }, [setOption])

    const onOutsideHandle = React.useCallback(() => {
        setOption(false)
    }, [setOption])

    const size = React.useMemo(() => {
        return { width: 120, height: 120 }
    }, [])

    const isEmpty = React.useMemo(() => {
        return project.resources.length === 0
    }, [project.resources])

    const visibleChildren = React.useMemo(
        () =>
            project.resources.map((resource) => (
                <Picture
                    {...size}
                    key={resource.id}
                    id={resource.id}
                    image={resource.file}
                />
            )),
        [size, project.resources]
    )

    return (
        <Explorer>
            <Header>
                <Panel>
                    <Title>Project</Title>
                    <Action onClick={onOptionHandle}>
                        <Folder />
                        {isOption && (
                            <React.Suspense fallback={<Empty />}>
                                <Dropdown onOutside={onOutsideHandle}>
                                    <Item
                                        onClick={onNewFile}
                                        role="button"
                                        disabled={isNewFileDisabled}>
                                        New File
                                    </Item>
                                    <Divider />
                                    <Item
                                        onClick={props.onNewProject}
                                        role="button">
                                        New Project
                                        <Shortcut>⇧⌃N</Shortcut>
                                    </Item>
                                    <Item
                                        onClick={props.onOpenProject}
                                        role="button">
                                        Open Project
                                        <Shortcut>⌃O</Shortcut>
                                    </Item>
                                </Dropdown>
                            </React.Suspense>
                        )}
                    </Action>
                </Panel>
                <Name>{props.project}</Name>
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
