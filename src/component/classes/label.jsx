import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    memo,
    useCallback
} from 'react'

import Text from '../text/index.jsx'
import Color from '../color/index.jsx'
import Checkbox from '../checkbox/index.jsx'

const Row = styled.div`
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: center;
    padding: 8px;
    width: 100%;

    &:hover {
        background-color: hsl(220, 13%, 20%);
        background-color: var(--color-highlight, hsl(220, 13%, 20%));
    }
`

const Picker = styled.div`
    border-radius: 4px;
    cursor: pointer;
    height: 38px;
    margin: 0 8px;
    min-width: 38px;
    width: 38px;
`

const Label = memo((props) => {
    const onSelectHandle = useCallback((event) => {
        if (props.onSelectHandle) {
            props.onSelectHandle(props.id, event.target.checked)
        }
    }, [ props ])

    const onChangeColorHandle = useCallback((color) => {
        if (props.onChangeColorHandle) {
            props.onChangeColorHandle(props.id, color)
        }
    }, [ props ])

    const onChangeNameHandle = useCallback((event) => {
        if (props.onChangeNameHandle) {
            props.onChangeNameHandle(props.id, event.target.value)
        }
    }, [ props ])

    return (
        <Row>
            <Checkbox checked={ props.checked }
                onChange={ onSelectHandle }
                tabIndex={ -1 } />

            <Picker style={{ background: props.color }}>
                <Color color={ props.color }
                    onChangeColorHandle={ onChangeColorHandle } />
            </Picker>

            <Text placeholder="Enter class name"
                onChange={ onChangeNameHandle }
                value={ props.name } />
        </Row>
    )
})

Label.displayName = 'Label'

Label.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    checked: PropTypes.bool,
    onChangeColorHandle: PropTypes.func,
    onChangeNameHandle: PropTypes.func,
    onSelectHandle: PropTypes.func
}

Label.defaultProps = {
    checked: false,
    onChangeColorHandle: null,
    onChangeHandle: null,
    onSelectHandle: null
}

export default Label