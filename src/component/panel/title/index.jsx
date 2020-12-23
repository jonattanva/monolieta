import { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Minus from '../../icon/minus/index.jsx'

const Root = styled.div`
    align-items: center;
    background-color: hsl(216, 13%, 20%);
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    height: 32px;
    justify-content: space-between;
    overflow: hidden;
    user-select: none;
`

const Text = styled.div`
    color: hsla(0,0%,100%,.90);
    color: var(--color-font, hsla(0,0%, 100%, .90));
    display: flex;
    font-weight: 500;
    justify-content: flex-start;
    line-height: 36px;
    padding-left: 8px;
    white-space: nowrap;
`

const Action = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding-right: 8px;
`

const Button = styled.div`
    align-items: center;
    background-color: transparent;
    border-radius: 4px;
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
    cursor: pointer;
    display: flex;
    height: 24px;
    justify-content: center;
    outline: none;
    text-align: center;
    width: 24px;

    &:hover {
        background-color: hsla(219, 13%, 66%, .2);
    }
`

const Title = memo((props) => (
    <Root>
        <Text>{ props.children }</Text>
        <Action>
            <Button onClick={ props.onHideHandle } role="button" title="Hide">
                <Minus width="20" height="20" />
            </Button>
        </Action>
    </Root>
))

Title.displayName = 'Title'

Title.propTypes = {
    /** Panel title */
    children: PropTypes.string.isRequired,

    /** Called when hide button is pressed */
    onHideHandle: PropTypes.func
}

Title.defaultProps = {
    onHideHandle: null
}

export default Title