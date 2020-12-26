import styled from 'styled-components'
import PropTypes from 'prop-types'
import { memo } from 'react'

import Title from './title/index.jsx'

const Root = styled.div`
    align-content: flex-start;
    align-items: stretch;
    background-color: hsl(220, 13%, 25%);
    background-color: var(--color-primary-dark-variant, hsl(220, 13%, 25%));
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: flex-start;
    min-width: ${({ $width }) => `${$width}px`};;
    width: ${({ $width }) => `${$width}px`};
`

const Body = styled.div`
    height: calc(100% - 32px);
    width: 100%;
`

const Panel = memo((props) => (
    <Root $width={ props.width }>
        <Title onHideHandle={ props.onHideHandle }>
            { props.title }
        </Title>
        <Body>
            { props.children }
        </Body>
    </Root>
))

Panel.displayName = 'Panel'

Panel.propTypes = {
    /** Title panel */
    title: PropTypes.string,

    /** Content panel */
    children: PropTypes.node,

    /** Called when hide button is pressed */
    onHideHandle: PropTypes.func,

    width: PropTypes.number
}

Panel.defaultProps = {
    title: '',
    onHideHandle: null,
    width: 300
}

export default Panel