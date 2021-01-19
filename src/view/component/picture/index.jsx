// @flow
import * as React from 'react'
import useKey, { areKeysPressed } from '../../hook/key.jsx'
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
        !complete ? css`${loading} 10s ease infinite` : 'none'};

    background: linear-gradient(
        90deg,
        hsl(220, 13%, 15%),
        hsl(220, 13%, 20%),
        hsl(220, 13%, 15%),
        hsl(220, 13%, 20%)
    );

    background: linear-gradient(
        90deg,
        var(--color-primary-dark: hsl(220, 13%, 15%)),
        var(--color-highlight: hsl(220, 13%, 20%)),
        var(--color-primary-dark: hsl(220, 13%, 15%)),
        var(--color-highlight: hsl(220, 13%, 20%))
    );

    background-size: 400% 400%;

    ${({ selected }) => selected && `
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
    image: string,
    width?: number,
    height?: number,
    selected: boolean,
    onUploadedImage: () => void,
    onDeletedImage: () => void,
    onSelectedImage: (boolean) => void
}

const Root = (props: PropsType): React.Node => {
    const keys = React.useMemo(() => ['Meta', 'Backspace'], [])
    const keysPressed = useKey(keys)

    React.useEffect(() => {
        if (!props.onDeletedImage || !props.selected) {
            return
        }

        if (areKeysPressed(keys, keysPressed)) {
            props.onDeletedImage()
        }
    }, [keys, props, keysPressed])

    const [isComplete, setComplete] = React.useState(false)

    const onLoadComplete = React.useCallback(() => {
        setComplete(true)
        if (props.onUploadedImage) {
            props.onUploadedImage()
        }
    }, [props, setComplete])

    const onSelectedImage = React.useCallback(() => {
        if (props.onSelectedImage) {
            props.onSelectedImage(!props.selected)
        }
    }, [props])

    return (
        <Cover
            role="cover"
            complete={isComplete}
            selected={props.selected}
            style={{ width: props.width, height: props.height }}>
            <Image
                onClick={onSelectedImage}
                selected={props.selected}
                onLoad={onLoadComplete}
                complete={isComplete}
                src={props.image}
                loading="lazy"
                role="image"
            />
        </Cover>
    )
}

Root.displayName = 'Picture'

Root.defaultProps = {
    selected: false,
    width: 120,
    height: 120
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
