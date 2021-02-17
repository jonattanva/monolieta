// @flow
import * as React from 'react'
import styled from 'styled-components'

const Body = styled.div`
    box-sizing: content-box;
    cursor: default;
    display: inline-block;
    flex: 0 0 18px;
    height: 18px;
    line-height: 0;
    padding: 11px;
    position: relative;
    vertical-align: bottom;
    white-space: nowrap;
    width: 18px;

    &:hover {
        background-color: hsl(220, 13%, 20%);
        background-color: var(--color-secondary-dark, hsl(220, 13%, 20%));
        border-radius: 50%;
        cursor: pointer;
    }
`

const Input = styled.input`
    cursor: inherit;
    height: 40px;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    width: 40px;
`

// prettier-ignore
const Background = styled.div`
    align-items: center;
    background-color: transparent;
    border-color: hsl(220, 13%, 65%);
    border-color: var(--color-font-light, hsl(220, 13%, 65%));
    border-radius: 4px;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    height: 18px;
    justify-content: center;
    left: 11px;
    line-height: 0;
    pointer-events: none;
    position: absolute;
    top: 11px;
    white-space: nowrap;
    width: 18px;

    ${({ $checked }) =>
        $checked &&
        `
        background-color: #6200ee;
        background-color: var(--color-primary, #6200ee);
        border-color: #6200ee;
        border-color: var(--color-primary, #6200ee);
    `}
`

const Icon = styled.svg`
    bottom: 0;
    color: hsl(0, 0%, 90%);
    color: var(--color-font: hsl(0, 0%, 90%));
    cursor: pointer;
    left: 0;
    line-height: 0;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    width: 100%;
`

// prettier-ignore
const Path = styled.path`
    color: transparent;
    cursor: pointer;
    line-height: 0;
    pointer-events: none;
    stroke-dasharray: 29.7833385;
    stroke-dashoffset: 0;
    stroke-width: 3.12px;
    stroke: currentColor;
    white-space: nowrap;

    ${({ $checked }) => $checked && `
        color: hsl(0, 0%, 90%);
        color: var(--color-font: hsl(0, 0%, 90%));
    `}
`

type PropsType = {
    checked?: boolean,
    onChange: (boolean) => void,
    tabIndex?: number
}

const Root = (props: PropsType): React.Node => {
    const { checked = false } = props

    const onChange = React.useCallback(
        (event) => {
            if (props.onChange) {
                props.onChange(event.target.checked)
            }
        },
        [props]
    )

    return (
        <Body data-checked={checked} onClick={onChange} role="input">
            <Input
                type="checkbox"
                defaultChecked={checked}
                tabIndex={props.tabIndex}
            />
            <Background $checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <Path
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                        $checked={checked}
                    />
                </Icon>
            </Background>
        </Body>
    )
}

Root.displayName = 'Checkbox'

export default (React.memo<PropsType>(Root): React.AbstractComponent<
    PropsType,
    mixed
>)
