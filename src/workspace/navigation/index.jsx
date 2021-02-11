// @flow
import * as React from 'react'
import styled from 'styled-components'
import Empty from 'component/empty'
import Label from 'component/icon/label'
import { Context } from 'component/session'

const Search = React.lazy(() => {
    return import('component/search')
})

const Action = React.lazy(() => {
    return import('component/action')
})

const Trash = React.lazy(() => {
    return import('component/icon/trash')
})

const Sort = React.lazy(() => {
    return import('component/icon/sort')
})

const Button = React.lazy(() => {
    return import('component/button')
})

const Clazz = React.lazy(() => {
    return import('component/class')
})

const Navigation = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 20%);
    background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    padding: 8px;
`

const Icon = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: 4px;
    width: 32px;

    &:hover {
        background-color: hsl(220, 13%, 15%);
        background-color: var(--color-secondary, hsl(220, 13%, 15%));
        border-radius: 4px;
    }
`

const Link = styled.a`
    align-items: center;
    display: flex;
    justify-content: center;
`

const Sidebar = styled.div`
    background-color: hsl(220, 13%, 25%);
    background-color: var(--color-secondary-light, hsl(220, 13%, 25%));
    border-radius: 4px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
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

const Dropdown = styled.div`
    display: inline-block;
    position: relative;
    z-index: 100;
`

const Title = styled.div`
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
`

const Summary = styled.div``

const Header = styled.div``

type PropsType = {
    onOpenClass?: () => void
}

const Root = (props: PropsType): React.Node => {
    const { project } = React.useContext(Context)

    const [isShowClasses, setShowClasses] = React.useState(true)

    const onOpenClass = React.useCallback(() => {
        setShowClasses((previous) => !previous)
        if (props.onOpenClass) {
            props.onOpenClass()
        }
    }, [props])

    const visibleClasses = React.useMemo(() => {
        return project.classes.map((clazz) => (
            <Clazz
                key={clazz.id}
                id={clazz.id}
                name={clazz.name}
                color={clazz.color}
                autoPosition={true}
                checked={clazz.checked}
            />
        ))
    }, [project])

    return (
        <Navigation>
            <Icon>
                <Label onClick={onOpenClass} />
                {isShowClasses && (
                    <React.Suspense fallback={<Empty />}>
                        <Dropdown>
                            <Sidebar>
                                <Title>Class manager</Title>
                                <Header>
                                    <Search />
                                    <Action>
                                        <Sort />
                                    </Action>
                                    <Action>
                                        <Trash />
                                    </Action>
                                    <Button>New class</Button>
                                </Header>
                                <div>{visibleClasses}</div>
                            </Sidebar>
                        </Dropdown>
                    </React.Suspense>
                )}
            </Icon>
            <Icon>
                <Link
                    href="https://github.com/jonattanva/monolieta"
                    rel="noopener noreferrer"
                    target="_blank">
                    <img src="image/github/icon.png" width={24} height={24} />
                </Link>
            </Icon>
        </Navigation>
    )
}

Root.displayName = 'Navigation'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
