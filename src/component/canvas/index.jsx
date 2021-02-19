// @flow
import * as React from 'react'
import styled from 'styled-components'
import { getRatio, spectRatio, getScale } from 'library/math'

const Canvas = styled.div`
    align-items: stretch;
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
`

const Scroll = styled.div`
    align-items: stretch;
    background: transparent;
    display: flex;
    height: 100%;
    margin: 0;
    position: relative;
    overflow: auto;
    transform: translateZ(0);
    width: 100%;
    will-change: scroll-position;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
`

const Absolute = styled.div`
    position: absolute;
`

type PropsType = {
    file?: string
}

const Root = (props: PropsType): React.Node => {
    const editorRef = React.useRef(null)

    const [image, setImage] = React.useState()

    const onLoadComplete = React.useCallback(
        (event) => {
            setImage({
                width: event.target.naturalWidth,
                height: event.target.naturalHeight
            })
        },
        [setImage]
    )

    const ratio = React.useMemo(() => {
        return image && getRatio(image.width, image.height)
    }, [image])

    const calculateContainer = React.useMemo(() => {
        const editor = editorRef.current
        if (!editor || !ratio) {
            return null
        }

        return spectRatio(
            {
                width: editor.offsetWidth,
                height: editor.offsetHeight
            },
            ratio
        )
    }, [ratio])

    const contentSize = React.useMemo(() => {
        if (!calculateContainer) {
            return null
        }

        const { width, height } = getScale(calculateContainer)

        return {
            width: width + 2 * calculateContainer.x,
            height: height + 2 * calculateContainer.y
        }
    }, [calculateContainer])

    const imageSize = React.useMemo(() => {
        if (!calculateContainer || !contentSize) {
            return null
        }

        return {
            left: calculateContainer.x,
            top: calculateContainer.y,
            width: contentSize.width - 2 * calculateContainer.x,
            height: contentSize.height - 2 * calculateContainer.y
        }
    }, [calculateContainer, contentSize])

    return (
        <Canvas ref={editorRef}>
            <Scroll>
                <Absolute style={{ ...contentSize }}>
                    <Absolute style={{ ...imageSize }}>
                        <Image
                            onLoad={onLoadComplete}
                            role="image"
                            src={props.file}
                        />
                    </Absolute>
                </Absolute>
            </Scroll>
        </Canvas>
    )
}

Root.displayName = 'Canvas'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
