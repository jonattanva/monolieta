import { memo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useName from '../../hook/name.jsx'

const Root = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    cursor: default;
    display: flex;
    flex-wrap: nowrap;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    justify-content: space-between;
    min-height: 42px;
    padding: 8px;
    user-select: none;
    width: 100%;
`

const Information = styled.div`
    display: flex;
    justify-content: flex-start;
`

const Item = styled.div`
    align-items: center;
    align-self: center;
    display: flex;
    font-size: .75rem;
    justify-content: center;
    margin: 0 4px;
`

const Status = memo((props) => {
    const filename = useName(props.filename)

    return (
        <Root>
            <Information>
                <Item>
                    { filename }
                </Item>
            </Information>
        </Root>
    )
})

Status.displayName = 'Status'

Status.propTypes = {
    filename: PropTypes.string
}

Status.defaultProps = {
    filename: ''
}

export default Status