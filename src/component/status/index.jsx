import PropTypes from 'prop-types'
import styled from 'styled-components'

import Range from '../range/index.jsx'
import Plus from '../icon/plus/index.jsx'
import Last from '../icon/last/index.jsx'
import Next from '../icon/next/index.jsx'
import Minus from '../icon/minus/index.jsx'
import Expand from '../icon/expand/index.jsx'

import {
    Button,
    Item,
    Separator
} from '../common.jsx'

import {
    memo,
    useMemo,
    useCallback
} from 'react'

const Root = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-dark, hsl(220, 13%, 15%));
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
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

const Left = styled.div`
    display: flex;
    justify-content: flex-start;
`

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Status = memo((props) => {
    const filename = useMemo(() => (
        props.filename.replace(/(.*\/.*\/|\?.*)/g, '')
    ), [ props.filename ])

    const onLastHandle = useCallback(() => {
        if (!props.onNavigationHandle || props.navigation.number < 1) {
            return
        }

        props.onNavigationHandle(
            props.navigation.number - 1
        )
    }, [ props ])

    const onNextHandle = useCallback(() => {
        if (!props.onNavigationHandle || props.navigation.number + 1 >= props.navigation.total) {
            return
        }

        props.onNavigationHandle(
            props.navigation.number + 1
        )
    }, [ props ])

    const onResetHandle = useCallback(() => {
        if (!props.onZoomHandle || props.zoom.value <= props.zoom.min) {
            return
        }

        props.onZoomHandle(props.zoom.min)
    }, [ props ])

    const onZoomOutHandle = useCallback(() => {
        if (!props.onZoomHandle || props.zoom.value <= props.zoom.min) {
            return
        }

        props.onZoomHandle(
            props.zoom.value - props.zoom.step
        )
    }, [ props ])

    const onZoomInHandle = useCallback(() => {
        if (!props.onZoomHandle || props.zoom.value >= props.zoom.max) {
            return
        }

        props.onZoomHandle(
            props.zoom.value + props.zoom.step
        )
    }, [ props ])

    const percent = useMemo(() => (
        ((props.zoom.value * 100) / 100).toLocaleString('en', {
            style: 'percent'
        })
    ), [ props.zoom.value ])

    return (
        <Root>
            <Left>
                <Item>{ filename }</Item>
            </Left>
            <Right>
                {
                    props.navigation.total > 0 && <Item>
                        {`${(props.navigation.number || 0) + 1} of ${props.navigation.total}`}
                    </Item>
                }
                <Item>
                    <Button disabled={ props.navigation.number < 1 } onClick={ onLastHandle } role="button">
                        <Last width="20" height="20" />
                    </Button>
                </Item>
                <Item>
                    <Button disabled={ props.navigation.number + 1 >= props.navigation.total } onClick={ onNextHandle } role="button">
                        <Next width="20" height="20" />
                    </Button>
                </Item>
                <Separator />
                <Item>
                    <Button onClick={ onResetHandle } role="button" title="Reset zoom">
                        <Expand width="20" height="20" />
                    </Button>
                </Item>
                <Item>
                    <Button onClick={ onZoomOutHandle } role="button" title="Zoom out">
                        <Minus width="20" height="20" />
                    </Button>
                </Item>
                <Item>
                    <Range { ...props.zoom }
                        onChange={ props.onZoomHandle } />
                </Item>
                <Item>
                    <Button onClick={ onZoomInHandle } role="button" title="Zoom in">
                        <Plus width="20" height="20" />
                    </Button>
                </Item>
                <Item>{ percent }</Item>
            </Right>
        </Root>
    )
})

Status.displayName = 'Status'

Status.propTypes = {
    /** File name */
    filename: PropTypes.string,

    /** Navigation settings */
    navigation: PropTypes.shape({
        number: PropTypes.number,
        total: PropTypes.number
    }),

    /** Gets called when the users navigate between files */
    onNavigationHandle: PropTypes.func,

    /** Gets called when the users zoom */
    onZoomHandle: PropTypes.func,

    /** Zoom settings */
    zoom: PropTypes.shape({
        max: PropTypes.number,
        min: PropTypes.number,
        step: PropTypes.number,
        value: PropTypes.number
    })
}

Status.defaultProps = {
    filename: '',
    navigation: {
        number: 0,
        total: 0
    },
    onNavigationHandle: null,
    onZoomHandle: null,
    zoom: {
        max: 4,
        min: 1,
        step: 0.1,
        value: 1
    }
}

export default Status