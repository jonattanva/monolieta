// @flow
import * as React from 'react'
import useKey, { areKeysPressed } from 'hook/key'
import styled, { css, keyframes } from 'styled-components'

const loading = keyframes`
    0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

// prettier-ignore
const Cover = styled.div`
    animation: ${({ complete }) =>
        !complete
            ? css`
                  ${loading} 10s ease infinite
              `
            : 'none'};

    background: linear-gradient(
        90deg,
        hsl(220, 13%, 15%),
        hsl(220, 13%, 20%),
        hsl(220, 13%, 15%),
        hsl(220, 13%, 20%)
    );

    background: linear-gradient(
        90deg,
        var(--color-primary-panel: hsl(220, 13%, 15%)),
        var(--color-secondary-panel: hsl(220, 13%, 20%)),
        var(--color-primary-panel: hsl(220, 13%, 15%)),
        var(--color-secondary-panel: hsl(220, 13%, 20%))
    );

    background-size: 400% 400%;
    ${({ selected }) =>
        selected &&
        css`
            background: #6200ee;
            background: var(--color-primary, #6200ee);
        `}
`

// prettier-ignore
const Image = styled.img`
    cursor: pointer;
    display: ${({ complete }) => !complete ? 'none': 'block'};
    height: 100%;
    object-fit: cover;
    padding: 0;
    width: 100%;

    ${({ selected }) => selected && css`
        height: 98%;
        padding: 1%;
        width: 98%;
    `}
`

type PropsType = {
    id: string,
    image: File,
    width?: number,
    margin?: number,
    height?: number,
    selected?: boolean,
    onDeletedImage?: (string) => void,
    onProgress?: (string, number) => void,
    onSelectedImage?: (string) => void,
    onUploadedImage?: (string) => void
}

const shortcutDelete = ['Meta', 'Backspace']

const Root = (props: PropsType): React.Node => {
    const imageRef = React.useRef<null | HTMLImageElement>(null)

    const keysPressed = useKey(shortcutDelete)
    const [isComplete, setComplete] = React.useState(false)

    const onLoad = React.useCallback(
        (event: any) => {
            const result = event.target.result
            if (result) {
                setComplete(true)
                if (imageRef.current) {
                    imageRef.current.src = result
                }
            }

            if (props.onUploadedImage) {
                props.onUploadedImage(props.id)
            }
        },
        [props]
    )

    const onProgress = React.useCallback(
        (event: any) => {
            if (!props.onProgress) {
                return
            }

            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100
                props.onProgress(props.id, percent)
            }
        },
        [props]
    )

    React.useEffect(() => {
        const reader = new FileReader()
        reader.addEventListener('load', onLoad)
        reader.addEventListener('progress', onProgress)
        reader.readAsDataURL(props.image)

        return () => {
            reader.removeEventListener('load', onLoad)
            reader.removeEventListener('progress', onProgress)
        }
    }, [props.image, onLoad, onProgress])

    const onSelectedImage = React.useCallback(() => {
        if (props.onSelectedImage) {
            props.onSelectedImage(props.id)
        }
    }, [props])

    React.useEffect(() => {
        if (!props.onDeletedImage) {
            return
        }

        if (props.selected && areKeysPressed(shortcutDelete, keysPressed)) {
            props.onDeletedImage(props.id)
        }
    }, [props, keysPressed])

    return (
        <Cover
            role="cover"
            complete={isComplete}
            selected={props.selected}
            style={{
                height: props.height,
                margin: props.margin,
                width: props.width
            }}>
            <Image
                onClick={onSelectedImage}
                selected={props.selected}
                complete={isComplete}
                ref={imageRef}
                loading="lazy"
                role="image"
            />
        </Cover>
    )
}

Root.displayName = 'Picture'

Root.defaultProps = {
    height: 120,
    margin: 4,
    selected: false,
    width: 120
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
