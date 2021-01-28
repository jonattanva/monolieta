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

const defaultValue = {
    key: '',
    name: ''
}

export const Session: React.Context<{
    project: Project,
    dispatch: Dispatch
}> = React.createContext<{
    project: Project,
    dispatch: Dispatch
}>({})

type PropsType = {
    children: React.Node
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
        <Session.Provider value={{ project, dispatch }}>
            {props.children}
        </Session.Provider>
    )
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
