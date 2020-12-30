import { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-dark, hsl(220, 13%, 15%));
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: hsl(0, 0%, 90%);
    color: var(--color-font, hsl(0, 0%, 90%));
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    min-height: 38px;
    outline: none;
    padding: 6px 12px;
    width: 100%;
`

const Text = memo((props) => (
    <Input type="text"
        value={ props.value }
        onChange={ props.onChange }
        autoFocus={ props.autofocus }
        placeholder={ props.placeholder } />
))

Text.displayName = "Text"

Text.propTypes = {
    /** Focus automatically */
    autofocus: PropTypes.bool,

    /** It is called every time there is a change */
    onChange: PropTypes.func,

    /** Sample value */
    placeholder: PropTypes.string,

    /** Element value */
    value: PropTypes.string
}

Text.defaultProps = {
    autofocus: false,
    onChange: null,
    placeholder: ''
}

export default Text