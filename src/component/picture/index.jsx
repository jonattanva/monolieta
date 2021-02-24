// @flow
import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { readImage } from 'library/file-system'

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

const Cover = styled.div`
    animation: ${({ complete }) =>
        !complete
            ? css`
                  ${loading} 10s ease infinite
              `
            : 'none'};

    background: linear-gradient(
        90deg,
        var(--color-secondary, hsl(220, 13%, 15%)),
        var(--color-secondary-dark, hsl(220, 13%, 20%)),
        var(--color-secondary, hsl(220, 13%, 15%)),
        var(--color-secondary-dark, hsl(220, 13%, 20%))
    );

    background-size: 400% 400%;
    ${({ selected, complete }) =>
        selected &&
        complete &&
        css`
            background: var(--color-primary, #6200ee);
        `}
`

const Image = styled.img`
    cursor: pointer;
    display: ${({ complete }) => (!complete ? 'none' : 'block')};
    height: 100%;
    object-fit: cover;
    padding: 0;
    width: 100%;

    ${({ selected, complete }) =>
        selected &&
        complete &&
        css`
            height: 98%;
            padding: 1%;
            width: 98%;
        `}
`

type PropsType = {
    id: string,
    file: File,
    selected?: boolean,
    width?: number,
    margin?: number,
    height?: number,
    onUploadedImage?: (string) => void,
    onDeletedImage?: (string) => void,
    onSelectedImage?: (string) => void
}

const Root = (props: PropsType): React.Node => {
    const { height = 120, margin = 4, width = 120, selected = false } = props

    const imageRef = React.useRef<null | HTMLImageElement>(null)
    const [isComplete, setComplete] = React.useState(false)

    React.useEffect(() => {
        let isSubscribed = true

        const read = async () => {
            const image = await readImage(props.file)

            if (isSubscribed) {
                setComplete(true)
                if (props.onUploadedImage) {
                    props.onUploadedImage(props.id)
                }
            }

            if (imageRef.current) {
                imageRef.current.src = image
            }
        }

        read()

        return () => {
            isSubscribed = false
        }
    }, [props])

    const onSelectedImage = () => {
        if (props.onSelectedImage) {
            props.onSelectedImage(props.id)
        }
    }

    return (
        <Cover
            role="cover"
            complete={isComplete}
            selected={selected}
            style={{ height, margin, width }}>
            <Image
                onClick={onSelectedImage}
                selected={selected}
                complete={isComplete}
                ref={imageRef}
                loading="lazy"
                role="image"
            />
        </Cover>
    )
}

Root.displayName = 'Picture'

export default Root
