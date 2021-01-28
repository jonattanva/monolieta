// @flow
import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    &[type='range'] {
        appearance: none;
        background-color: #6200ee;
        background-color: var(--color-primary, #6200ee);
        margin: 8px 0;
        outline: none;
        width: 100%;
    }

    &[type='range']:hover::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px 4px rgba(98, 0, 238, 0.16);
        box-shadow: 0px 0px 0px 4px
            var(--color-primary-highlight, rgba(98, 0, 238, 0.16));
    }

    &[type='range']::-webkit-slider-runnable-track {
        appearance: none;
        border-radius: 25px;
        cursor: pointer;
        height: 4px;
        width: 100%;
    }

    &[type='range']::-webkit-slider-thumb {
        appearance: none;
        background-color: #6200ee;
        background-color: var(--color-primary, #6200ee);
        border-radius: 50%;
        cursor: pointer;
        height: 14px;
        margin-top: -5px;
        width: 14px;
    }
`

type PropsType = {
    max?: number,
    min?: number,
    onChange: (number) => void,
    step?: number,
    value: number
}

const Root = (props: PropsType): React.Node => {
    const { max = 100, min = 0, step = 1, value = 0 } = props

    const onChange = React.useCallback(
        (event) => {
            if (props.onChange) {
                const value = Number(event.target.value)
                props.onChange(value)
            }
        },
        [props]
    )

    const nivel = React.useMemo(() => {
        return ((value - min) / (max - min)) * 100
    }, [value, min, max])

    return (
        <Input
            type="range"
            role="input"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            style={{
                backgroundImage: `linear-gradient(to right, #6200ee ${nivel}%, #f5f5f5 0)`
            }}
        />
    )
}

Root.displayName = 'Range'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
