// @flow
import * as React from 'react'
import styled from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { getRatio, scale } from '../../../utils/math.js'

const Canvas = styled.div`
    align-items: stretch;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
`

const Absolute = styled.div`
    position: absolute;
`

type PropsType = {
    image: string,
    zoom?: number
}

const Root = (props: PropsType): React.Node => {
    const editorRef = React.useRef()
    const scrollRef = React.useRef()

    const [image, setImage] = React.useState()

    const onLoadComplete = React.useCallback(
        (event: any) => {
            setImage(event.target)
        },
        [setImage]
    )

    const ratio = React.useMemo(() => {
        return image && getRatio(image.naturalWidth, image.naturalHeight)
    }, [image])

    const relativeScrollPosition = React.useMemo(() => {
        const scroll = scrollRef.current
        if (!scroll) {
            return null
        }

        const values = scroll.getValues()
        let nextRelativeScrollPosition = {
            x: values.left,
            y: values.top
        }

        const zoom = props.zoom || 1
        if (zoom - 0.1 === 1) {
            nextRelativeScrollPosition = {
                x: 0.5,
                y: 0.5
            }
        }

        return nextRelativeScrollPosition
    }, [props.zoom])

    const calculateContainer = React.useMemo(() => {
        const editor = editorRef.current
        if (!editor || !ratio) {
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
    }, [ratio])

    const contentSize = React.useMemo(() => {
        if (!calculateContainer) {
            return null
        }

        const { width, height } = scale(calculateContainer, props.zoom)
        return {
            width: width + 2 * calculateContainer.left,
            height: height + 2 * calculateContainer.top
        }
    }, [props.zoom, calculateContainer])

    const imageSize = React.useMemo(() => {
        if (!calculateContainer || !contentSize) {
            return null
        }

        return {
            ...calculateContainer,
            width: contentSize.width - 2 * calculateContainer.left,
            height: contentSize.height - 2 * calculateContainer.top
        }
    }, [calculateContainer, contentSize])

    const calculateScrollPosition = React.useMemo(() => {
        if (!relativeScrollPosition || !contentSize) {
            return null
        }

        const editor = editorRef.current
        if (!editor) {
            return null
        }

        return {
            x:
                relativeScrollPosition.x *
                (contentSize.width - editor.offsetWidth),
            y:
                relativeScrollPosition.y *
                (contentSize.height - editor.offsetHeight)
        }
    }, [relativeScrollPosition, contentSize])

    React.useEffect(() => {
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
    }, [calculateScrollPosition])

    return (
        <Canvas ref={editorRef}>
            <Scrollbars ref={scrollRef}>
                <Absolute style={{ ...contentSize }}>
                    <Absolute style={{ ...imageSize }}>
                        <Image onLoad={onLoadComplete} src={props.image} />
                    </Absolute>
                </Absolute>
            </Scrollbars>
        </Canvas>
    )
}

Root.displayName = 'Canvas'

Root.defaultProps = {
    zoom: 1
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
