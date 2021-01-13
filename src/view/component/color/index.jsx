// @flow
import * as React from 'react'
import styled from 'styled-components'

import '@simonwep/pickr/dist/themes/nano.min.css'
import Pickr from '@simonwep/pickr'

const Button = styled.div`
    height: 100%;
    width: 100%;
`

const Picker = styled.div`
    bottom: auto;
    display: ${({ show }) => (show ? 'block' : 'none')};
    margin: 0;
    position: absolute;
    right: auto;
    z-index: 100;

    & > .pcr-app {
        background-color: hsl(220, 13%, 15%);
        background-color: var(--color-primary-dark, hsl(220, 13%, 15%));

        & > .pcr-interaction .pcr-save {
            background-color: #6200ee;
            background-color: var(--color-primary, #6200ee);
        }
    }
`

const picker = (ref: any, color: string = '#42445a') => ({
    el: ref.current,
    theme: 'nano',
    default: color,
    inline: true,
    useAsButton: true,
    swatches: [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107'
    ],
    components: {
        hue: true,
        preview: true,
        interaction: {
            input: true,
            save: true
        }
    }
})

type PropsType = {
    color: string,
    onSavedColor: (string) => void
}

const Color = (props: PropsType): React.Node => {
    const colorRef = React.useRef()
    const pickrRef: any = React.useRef()

    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        pickrRef.current = Pickr.create(picker(colorRef))
        return () => {
            pickrRef.current.destroy()
        }
    }, [])

    const init = React.useCallback(
        (instance) => {
            if (props.color && props.color !== '') {
                const current = instance
                    .getColor()
                    .toHEXA()
                    .toString()
                    .toUpperCase()

                if (props.color.toUpperCase() !== current) {
                    instance.setColor(props.color, true)
                }
            }
        },
        [props.color]
    )

    const hide = React.useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const save = React.useCallback(
        (color, instance) => {
            if (props.onSavedColor && color) {
                const current = color.toHEXA().toString().toUpperCase()
                props.onSavedColor(current)
            }
            instance.hide()
        },
        [props]
    )

    React.useEffect(() => {
        if (!pickrRef.current) {
            return
        }

        pickrRef.current.on('init', init)
        pickrRef.current.on('hide', hide)
        pickrRef.current.on('save', save)

        return () => {
            pickrRef.current.off('init', init)
            pickrRef.current.off('hide', hide)
            pickrRef.current.off('save', save)
        }
    }, [init, hide, save])

    const onOpenHandle = React.useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()

        pickrRef.current.show()
        setOpen(true)
    }, [])

    return (
        <React.Fragment>
            <Button onClick={onOpenHandle} role="button" />
            <Picker show={open}>
                <div ref={colorRef}></div>
            </Picker>
        </React.Fragment>
    )
}

Color.displayName = 'Color'

Color.defaultProps = {
    color: '#6200ee'
}

export default Color
