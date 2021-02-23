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
    user-drag: none;
    user-select: none;
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
            const { naturalWidth, naturalHeight } = event.target
            setImage({
                width: naturalWidth,
                height: naturalHeight
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

        const { offsetWidth, offsetHeight } = editor
        return spectRatio(
            {
                width: offsetWidth,
                height: offsetHeight
            },
            ratio
        )
    }, [ratio])

    const contentSize = React.useMemo(() => {
        if (!calculateContainer) {
            return null
        }

        const scale = getScale(calculateContainer)

        const width = scale.width + 2 * calculateContainer.x
        const height = scale.height + 2 * calculateContainer.y

        return { width, height }
    }, [calculateContainer])

    const imageSize = React.useMemo(() => {
        if (!calculateContainer || !contentSize) {
            return null
        }

        const left = calculateContainer.x
        const top = calculateContainer.y

        const width = contentSize.width - 2 * calculateContainer.x
        const height = contentSize.height - 2 * calculateContainer.y

        return { left, top, width, height }
    }, [calculateContainer, contentSize])

    return (
        <Canvas ref={editorRef}>
            <Scroll>
                <Absolute style={{ ...contentSize }}>
                    <Absolute style={{ ...imageSize }}>
                        <Image
                            onLoad={onLoadComplete}
                            src={props.file}
                            role="image"
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
