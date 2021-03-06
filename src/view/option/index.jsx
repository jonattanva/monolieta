// @flow
import * as React from 'react'
import shortcut from 'util/shortcut'
import Dropdown, { Item, Divider, Shortcut } from 'component/dropdown'

type PropsType = {
    isNewFileDisabled: boolean,
    onNewFile: (Event) => Promise<void>,
    onNewProject: (Event) => void,
    onOpenProject: (Event) => Promise<void>,
    onOutside: () => void
}

const Root = (props: PropsType): React.Node => {
    const { isNewFileDisabled = false } = props

    return (
        <Dropdown onOutside={props.onOutside}>
            <Item
                onClick={props.onNewFile}
                role="button"
                disabled={isNewFileDisabled}>
                New File
            </Item>
            <Divider />
            <Item onClick={props.onNewProject} role="button">
                New Project
            </Item>
            <Item onClick={props.onOpenProject} role="button">
                Open Project
                <Shortcut>{shortcut.open.title}</Shortcut>
            </Item>
        </Dropdown>
    )
}

Root.displayName = 'Option'

export default Root
