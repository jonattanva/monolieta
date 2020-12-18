import PropTypes from 'prop-types'
import styled from 'styled-components'

import '@simonwep/pickr/dist/themes/nano.min.css'
import Pickr from '@simonwep/pickr'

import {
    memo,
    useRef,
    useState,
    Fragment,
    useEffect,
    useCallback
} from 'react'

const Button = styled.div`
    height: 100%;
    width: 100%;
`

const Picker = styled.div`
    bottom: auto;
    display: ${({ show }) => show ? 'block' : 'none'};
    margin: 0;
    position: absolute;
    right: auto;
    z-index: 100;
`

const picker = (ref, color = '#42445a') => ({
    el: ref.current,
    theme: 'nano',
    default: color,
    inline: true,
    useAsButton: true,
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
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

    const init = useCallback((instance) => {
        if (props.color && props.color !== "") {
            const current = instance.getColor()
                .toHEXA()
                .toString()
                .toUpperCase()

            if (props.color.toUpperCase() !== current) {
                instance.setColor(props.color, true)
            }
        }
    }, [ props.color ])

    const hide = useCallback(() => {
        setOpen(false)
    }, [ setOpen ])

    const save = useCallback((color, instance) => {
        if (props.onChangeColorHandle && color) {
            const current = color.toHEXA()
                .toString()
                .toUpperCase()
            props.onChangeColorHandle(current)
        }
        instance.hide()
    }, [ props ])

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

    }, [ init, hide, save ])

    const onOpenHandle = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()

        pickrRef.current.show()
        setOpen(true)
    }, [])

    return (
        <Fragment>
            <Button onClick={ onOpenHandle } role="button" />
            <Picker show={ open } style={ props.position }>
                <div ref={ colorRef }></div>
            </Picker>
        </Fragment>
    )
})

Color.displayName = 'Color'

Color.propTypes = {
    /** Default color */
    color: PropTypes.string,

    /** Notify that the color has been changed */
    onChangeColorHandle: PropTypes.func,

    /** Position color picker */
    position: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number
    })
}

Color.defaultProps = {
    color: '#42445a',
    onChangeColorHandle: null,
    position: null
}

export default Color