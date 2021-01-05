import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../button/index.jsx'
import { memo, useRef, Fragment } from 'react'

const Input = styled.input`
    display: none;
`

const File = memo((props) => {
    const fileInputRef = useRef()

    const onOpenFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const onFilesAdded = (event) => {
        if (props.onFilesAdded) {
            const files = Array.from(event.target.files)
            props.onFilesAdded(files)
        }
    }

    return (
        <Fragment>
            <Button onClick={onOpenFile}>{props.children}</Button>
            <Input
                type="file"
                data-testid="file"
                multiple="multiple"
                ref={fileInputRef}
                accept={props.accept}
                onChange={onFilesAdded}
            />
        </Fragment>
    )
})

File.displayName = 'File'

File.propTypes = {
    /** File type specifier */
    accept: PropTypes.string,

    /** Button title */
    children: PropTypes.string,

    /** Notify that a file has been included */
    onFilesAdded: PropTypes.func
}

File.defaultProps = {
    accept: '.jpg,.jpeg,.png,.webp,.gif,.bmp,.ico',
    children: 'Browse files',
    onFilesAdded: null
}

export default File
