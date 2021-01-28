// @flow
import * as React from 'react'
import Button from '../button/index.jsx'

type PropsType = {
    accept?: string,
    children: string,
    onFilesAdded: (Array<File>) => void
}

const Root = (props: PropsType): React.Node => {
    const fileInputRef = React.useRef()

    const onOpenFile = React.useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }, [])

    const onFilesAdded = React.useCallback(
        (event) => {
            if (props.onFilesAdded) {
                const files = Array.from(event.target.files)
                props.onFilesAdded(files)
            }
        },
        [props]
    )

    return (
        <React.Fragment>
            <Button onClick={onOpenFile}>{props.children}</Button>
            <input
                type="file"
                role="input"
                ref={fileInputRef}
                multiple="multiple"
                directory="directory"
                accept={props.accept}
                onChange={onFilesAdded}
                style={{ display: 'none' }}
                webkitdirectory="webkitdirectory"
            />
        </React.Fragment>
    )
}

Root.displayName = 'File'

Root.defaultProps = {
    accept: '.jpg,.jpeg,.png,.webp',
    children: 'Browse files'
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
