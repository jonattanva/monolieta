//@flow
import * as React from 'react'
import * as Monolieta from 'Monolieta'

export const Context: React.Context<{
    project: Monolieta.Project,
    dispatch: Monolieta.Dispatch
}> = React.createContext<{
    project: Monolieta.Project,
    dispatch: Monolieta.Dispatch
}>({})

const defaultValue = {
    key: '',
    name: '',
    resources: [],
    classes: []
}

type PropsType = {
    children: React.Node
}

const Root = (props: PropsType) => {
    const onReducer = React.useCallback((state, action) => {
        const {
            key = '',
            name = '',
            resources = [],
            classes = []
        } = action.project

        switch (action.type) {
            case '/start': {
                return {
                    key: key,
                    name: name,
                    resources: resources,
                    classes: classes
                }
            }

            case '/class': {
                return {
                    ...state,
                    classes: [...classes]
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
