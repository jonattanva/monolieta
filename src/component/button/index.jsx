import { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
    align-items: center;
    background-color: #6200ee;
    background-color: var(--color-primary,#6200ee);
    border-radius: 4px;
    box-sizing: border-box;
    color: hsla(0,0%,100%,.90);
    color: var(--color-font,hsla(0,0%,100%,.90));
    cursor: pointer;
    display: inline-flex;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    font-weight: 500;
    height: 36px;
    justify-content: center;
    letter-spacing: .0178571429em;
    line-height: 18px;
    min-width: 64px;
    outline: none;
    padding: 0 16px 0 16px;
    position: relative;
    text-align: center;
    transition: 0.3s;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;

    &:active {
        background-color: #9951ff;
        background-color: var(--color-primary-variant,#9951ff);
    }
`

const Button = memo((props) => (
    <Root onClick={ props.onClick } role="button">
        { props.children }
    </Root>
))

Button.displayName = 'Button'

Button.propTypes = {
    /** Button title */
    children: PropTypes.string.isRequired,

    /** Gets called when the users click */
    onClick: PropTypes.func
}

Button.defaultProps = {
    onClick: null
}

export default Button