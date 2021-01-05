import PropTypes from 'prop-types'
import styled from 'styled-components'
import { memo, useRef, useState, Fragment, useEffect, useCallback } from 'react'

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

const picker = (ref, color = '#42445a') => ({
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

const Color = memo((props) => {
    const colorRef = useRef()
    const pickrRef = useRef()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        pickrRef.current = Pickr.create(picker(colorRef))
        return () => {
            pickrRef.current.destroy()
        }
    }, [])

    const init = useCallback(
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

    const hide = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const save = useCallback(
        (color, instance) => {
            if (props.onSavedColor && color) {
                const current = color.toHEXA().toString().toUpperCase()
                props.onSavedColor(current)
            }
            instance.hide()
        },
        [props]
    )

    useEffect(() => {
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

    const onOpenHandle = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()

        pickrRef.current.show()
        setOpen(true)
    }, [])

    return (
        <Fragment>
            <Button onClick={onOpenHandle} role="button" />
            <Picker show={open} style={props.position}>
                <div ref={colorRef}></div>
            </Picker>
        </Fragment>
    )
})

Color.displayName = 'Color'

Color.propTypes = {
    /** Default color */
    color: PropTypes.string,

    /** Notify that the color has been changed */
    onSavedColor: PropTypes.func,

    /** Position color picker */
    position: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number
    })
}

Color.defaultProps = {
    color: '#6200ee',
    onSavedColor: null,
    position: null
}

export default Color
