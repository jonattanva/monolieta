//@flow
import * as React from 'react'

type Project = {
    key: string,
    name: string
}

type Action = {
    type: '/start',
    project: Project
}

type Dispatch = (action: Action) => void

type PropsType = {
    children: React.Node
}

export const Context: React.Context<{
    project: Project,
    dispatch: Dispatch
}> = React.createContext<{
    project: Project,
    dispatch: Dispatch
}>({})

const defaultValue = {
    key: '',
    name: ''
}

const Root = (props: PropsType) => {
    const onReducer = React.useCallback((state, action) => {
        switch (action.type) {
            case '/start': {
                return {
                    key: action.project.key,
                    name: action.project.name
                }
            }
            default: {
                return defaultValue
            }
        }
    }, [])

    const [project, dispatch] = React.useReducer(onReducer, defaultValue)

    return (
        <Context.Provider value={{ project, dispatch }}>
            {props.children}
        </Context.Provider>
    )
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
