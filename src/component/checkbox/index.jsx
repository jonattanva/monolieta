import { memo } from 'react'
import PropTypes from 'prop-types'
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
        background-color: rgba(0, 0, 0, .09);
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

const Background = styled.div`
    align-items: center;
    background-color: transparent;
    border-color: hsl(219, 13%, 66%);
    border-color: var(--color-font-variant, hsl(219, 13%, 66%));
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

    ${({ $checked }) => $checked && `
        background-color: #6200ee;
        background-color: var(--color-primary, #6200ee);
        border-color: #6200ee;
        border-color: var(--color-primary, #6200ee);
    `}
`

const Icon = styled.svg`
    bottom: 0;
    color: hsla(0,0%,100%,.90);
    color: var(--color-font,hsla(0,0%,100%,.90));
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
        color: hsla(0,0%,100%,.90);
        color: var(--color-font,hsla(0,0%,100%,.90));
    `}
`

const Checkbox = memo((props) => {
    const onChange = (event) => {
        if (props.onChange) {
            props.onChange(event, props.row)
        }
    }

    return (
        <Body data-checked={ props.checked } onClick={ onChange } role="input">
            <Input type="checkbox" tabIndex={ props.tabIndex } defaultChecked={ props.checked } />
            <Background $checked={ props.checked }>
                <Icon viewBox="0 0 24 24">
                    <Path fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" $checked={ props.checked } />
                </Icon>
            </Background>
        </Body>
    )
})

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
    /** Checkbox status */
    checked: PropTypes.bool,

    /** Current item index */
    row: PropTypes.number,

    /** Gets called when the users click */
    onChange: PropTypes.func,

    /** Sequential keyboard navigation */
    tabIndex: PropTypes.number
}

Checkbox.defaultProps = {
    checked: false,
    onChange: null,
    tabIndex: 0
}

export default Checkbox