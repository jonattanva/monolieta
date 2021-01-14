// @flow
import * as React from 'react'
import styled from 'styled-components'
import Button from '../button/index.jsx'

const Input = styled.input`
    display: none;
`

type PropsType = {
    accept: string,
    children: string,
    onFilesAdded: (Array<typeof File>) => void
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
            <Input
                type="file"
                data-testid="file"
                multiple="multiple"
                ref={fileInputRef}
                accept={props.accept}
                onChange={onFilesAdded}
            />
        </React.Fragment>
    )
}

Root.displayName = 'File'

Root.defaultProps = {
    accept: '.jpg,.jpeg,.png,.webp,.gif,.bmp,.ico',
    children: 'Browse files',
    onFilesAdded: null
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
