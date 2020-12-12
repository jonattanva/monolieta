import PropTypes from 'prop-types'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'

import {
    memo,
    useRef,
    useMemo,
    useState,
    useEffect,
    useCallback
 } from 'react'

const View = styled.div`
    align-items: stretch;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
`

const Image = styled.img`
    height: 100%;
    user-select: none;
    width: 100%;
`

const Absolute = styled.div`
    position: absolute;
`

const Canvas = memo((props) => {
    const editorRef = useRef()
    const scrollRef = useRef()

    const [ image, setImage ] = useState()

    const relativeScrollPosition = useMemo(() => {
        const scroll = scrollRef.current
        if (!scroll) {
            return null
        }

        const values = scroll.getValues()
        let nextRelativeScrollPosition = {
            x: values.left,
            y: values.top
        }

        if ((props.zoom.value - props.zoom.step) === 1) {
            nextRelativeScrollPosition = {
                x: 0.5,
                y: 0.5
            }
        }

        return nextRelativeScrollPosition
    }, [ props.zoom ])

    const onLoadComplete = useCallback((event) => {
        setImage(event.target)
    }, [ setImage ])

    const ratio = useMemo(() => (
        image && image.naturalWidth / image.naturalHeight
    ), [ image ])

    const calculateContainer = useMemo(() => {
        const editor = editorRef.current
        if (!editor) {
            return null
        }

        const parentRatio = editor.offsetWidth / editor.offsetHeight
        if (parentRatio < ratio) {
            const innerHeight = editor.offsetWidth / ratio
            return {
                left: 0,
                top: (editor.offsetHeight - innerHeight) / 2,
                width: editor.offsetWidth,
                height: innerHeight
            }
        }

        const innerWidth = editor.offsetHeight * ratio
        return {
            left: (editor.offsetWidth - innerWidth) / 2,
            top: 0,
            width: innerWidth,
            height: editor.offsetHeight
        }

    }, [ ratio ])

    const contentSize = useMemo(() => {
        if (!calculateContainer) {
            return null
        }

        const width = calculateContainer.width * props.zoom.value
        const height = calculateContainer.height * props.zoom.value

        return {
            width: width + 2 * calculateContainer.left,
            height: height + 2 * calculateContainer.top
        }
    }, [ calculateContainer, props.zoom.value ])

    const imageSize = useMemo(() => {
        if (!calculateContainer) {
            return null
        }

        return {
            ...calculateContainer,
            width: contentSize.width - 2 * calculateContainer.left,
            height: contentSize.height - 2 * calculateContainer.top
        }
    }, [ contentSize, calculateContainer ])

    const calculateScrollPosition = useMemo(() => {
        if (!relativeScrollPosition || !contentSize) {
            return null
        }

        const editor = editorRef.current
        if (!editor) {
            return null
        }

        return {
            x: relativeScrollPosition.x * (contentSize.width - editor.offsetWidth),
            y: relativeScrollPosition.y * (contentSize.height - editor.offsetHeight)
        }

    }, [ relativeScrollPosition, contentSize ])

    useEffect(() => {
        if (!calculateScrollPosition) {
            return
        }

        const scroll = scrollRef.current
        if (!scroll) {
            return
        }

        const { x, y } = calculateScrollPosition
        scroll.scrollLeft(x)
        scroll.scrollTop(y)

    }, [ calculateScrollPosition ])

    return (
        <View ref={ editorRef }>
            <Scrollbars ref={ scrollRef }>
                <Absolute style={{ ...contentSize }}>
                    <Absolute style={{ ...imageSize }}>
                        <Image onLoad={ onLoadComplete } src="https://images.unsplash.com/photo-1594392175506-29798601d67e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" />
                    </Absolute>
                </Absolute>
            </Scrollbars>
        </View>
    )
})

Canvas.displayName = 'Canvas'

Canvas.propTypes = {
    /** Zoom settings */
    zoom: PropTypes.shape({
        max: PropTypes.number,
        min: PropTypes.number,
        step: PropTypes.number,
        value: PropTypes.number
    })
}

Canvas.defaultProps = {
    zoom: {
        max: 4,
        min: 1,
        step: 0.1,
        value: 1
    }
}

export default Canvas