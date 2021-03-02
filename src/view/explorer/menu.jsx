// @flow
import * as React from 'react'
import Empty from 'component/empty'
import Action from 'component/action'
import Folder from 'component/icon/folder'
import shortcut from 'util/shortcut'
import useKeyboard from 'hook/keyboard'

const Option = React.lazy(() => {
    return import('view/option')
})

type PropsType = {
    isNewFileDisabled: boolean,
    onNewFile: (Event) => Promise<void>,
    onNewProject: (Event) => void,
    onOpenProject: (Event) => Promise<void>
}

const Root = (props: PropsType): React.Node => {
    const [isOption, setOption] = React.useState(false)

    useKeyboard(shortcut.escape.key, () => {
        if (isOption) {
            setOption(false)
        }
    })

    const onOptionHandle = () => {
        setOption((previous) => !previous)
    }

    const onOutside = () => {
        setOption(false)
    }

    return (
        <Action onClick={onOptionHandle}>
            <Folder />
            {isOption && (
                <React.Suspense fallback={<Empty />}>
                    <Option
                        onOutside={onOutside}
                        onNewFile={props.onNewFile}
                        onNewProject={props.onNewProject}
                        onOpenProject={props.onOpenProject}
                        isNewFileDisabled={props.isNewFileDisabled}
                    />
                </React.Suspense>
            )}
        </Action>
    )
}

Root.displayName = 'Menu'

export default Root
