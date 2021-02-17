// @flow
import * as React from 'react'
import Dropdown, { Item, Divider } from 'component/dropdown'

type PropsType = {
    isNewFileDisabled?: boolean,
    onNewFile?: (Event) => void,
    onNewProject?: (Event) => void,
    onOpenProject?: (Event) => void | Promise<void>,
    onOutside?: () => void
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
            </Item>
        </Dropdown>
    )
}

Root.displayName = 'Option'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
