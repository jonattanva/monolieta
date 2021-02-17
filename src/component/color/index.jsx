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
    display: var(--color-picker-show, none);
    margin: 0;
    position: absolute;
    right: auto;
    z-index: 100;

    & > .pcr-app {
        background-color: hsl(220, 13%, 15%);
        background-color: var(--color-secondary, hsl(220, 13%, 15%));

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
    color?: string,
    autoPosition?: boolean,
    onSavedColor: (string) => void
}

export const random = (included: Array<string> = []): string => {
    const color = colors[Math.floor(Math.random() * colors.length)]
    if (included.includes(color)) {
        return random(included)
    }
    return color
}

const Root = (props: PropsType): React.Node => {
    const colorRef = React.useRef()
    const pickrRef: any = React.useRef()

    const [open, setOpen] = React.useState(false)
    const [position, setPosition] = React.useState(null)

    const { autoPosition = false } = props

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

                if (props.color && props.color.toUpperCase() !== current) {
                    instance.setColor(props.color, true)
                }
            }
        },
        [props.color]
    )

    const hide = React.useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const onSavedColor = React.useCallback(
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
        pickrRef.current.on('save', onSavedColor)

        return () => {
            pickrRef.current.off('init', init)
            pickrRef.current.off('hide', hide)
            pickrRef.current.off('save', onSavedColor)
        }
    }, [init, hide, onSavedColor])

    const onOpenHandle = React.useCallback(
        (event) => {
            event.preventDefault()
            event.stopPropagation()

            if (autoPosition) {
                if (!document.documentElement) {
                    return
                }

                const {
                    height
                } = document.documentElement.getBoundingClientRect()

                const root = 242
                const margin = 20
                const { y } = event.target.getBoundingClientRect()

                let position = y - margin
                const extra = position + root - height
                if (extra > 0) {
                    position = position - extra - 40
                }
                setPosition(position)
            }

            pickrRef.current.show()
            setOpen(true)
        },
        [autoPosition]
    )

    const isShow = React.useMemo(() => {
        return open ? 'block' : 'none'
    }, [open])

    return (
        <React.Fragment>
            <Button onClick={onOpenHandle} role="button" />
            <Picker style={{ '--color-picker-show': isShow, top: position }}>
                <div ref={colorRef}></div>
            </Picker>
        </React.Fragment>
    )
}

Root.displayName = 'Color'

Root.defaultProps = {
    color: '#6200ee'
}

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)

// prettier-ignore
const colors = [
    "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350",
    "#F44336", "#E53935", "#D32F2F", "#C62828",
    "#B71C1C", "#FF8A80", "#FF5252", "#FF1744",
    "#D50000", "#F8BBD0", "#F48FB1", "#F06292",
    "#EC407A", "#E91E63", "#D81B60", "#C2185B",
    "#AD1457", "#880E4F", "#FF80AB", "#FF4081",
    "#F50057", "#C51162", "#E1BEE7", "#CE93D8",
    "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA",
    "#7B1FA2", "#6A1B9A", "#4A148C", "#EA80FC",
    "#E040FB", "#D500F9", "#AA00FF", "#B39DDB",
    "#9575CD", "#7E57C2", "#673AB7", "#5E35B1",
    "#512DA8", "#4527A0", "#311B92", "#B388FF",
    "#7C4DFF", "#651FFF", "#6200EA", "#9FA8DA",
    "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB",
    "#303F9F", "#283593", "#1A237E", "#8C9EFF",
    "#536DFE", "#3D5AFE", "#304FFE", "#BBDEFB",
    "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3",
    "#1E88E5", "#1976D2", "#1565C0", "#0D47A1",
    "#82B1FF", "#448AFF", "#2979FF", "#2962FF",
    "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6",
    "#03A9F4", "#039BE5", "#0288D1", "#0277BD",
    "#01579B", "#80D8FF", "#40C4FF", "#00B0FF",
    "#0091EA", "#B2EBF2", "#80DEEA", "#4DD0E1",
    "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7",
    "#00838F", "#006064", "#84FFFF", "#18FFFF",
    "#00E5FF", "#00B8D4", "#B2DFDB", "#80CBC4",
    "#4DB6AC", "#26A69A", "#009688", "#00897B",
    "#00796B", "#00695C", "#004D40", "#A7FFEB",
    "#64FFDA", "#1DE9B6", "#00BFA5", "#C8E6C9",
    "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50",
    "#43A047", "#388E3C", "#2E7D32", "#1B5E20",
    "#B9F6CA", "#69F0AE", "#00E676", "#00C853",
    "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65",
    "#8BC34A", "#7CB342", "#689F38", "#558B2F",
    "#33691E", "#CCFF90", "#B2FF59", "#76FF03",
    "#64DD17", "#F0F4C3", "#E6EE9C", "#DCE775",
    "#D4E157", "#CDDC39", "#C0CA33", "#AFB42B",
    "#9E9D24", "#827717", "#F4FF81", "#EEFF41",
    "#C6FF00", "#AEEA00", "#FFF9C4", "#FFF59D",
    "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835",
    "#FBC02D", "#F9A825", "#F57F17", "#FFFF8D",
    "#FFFF00", "#FFEA00", "#FFD600", "#FFECB3",
    "#FFE082", "#FFD54F", "#FFCA28", "#FFC107",
    "#FFB300", "#FFA000", "#FF8F00", "#FF6F00",
    "#FFE57F", "#FFD740", "#FFC400", "#FFAB00",
    "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726",
    "#FF9800", "#FB8C00", "#F57C00", "#EF6C00",
    "#E65100", "#FFD180", "#FFAB40", "#FF9100",
    "#FF6D00", "#FFCCBC", "#FFAB91", "#FF8A65",
    "#FF7043", "#FF5722", "#F4511E", "#E64A19",
    "#D84315", "#BF360C", "#FF9E80", "#FF6E40",
    "#FF3D00", "#DD2C00"
]
