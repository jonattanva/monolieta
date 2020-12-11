import PropTypes from 'prop-types'
import styled from 'styled-components'

import Range from '../range/index.jsx'
import usePercent from '../../hook/percent.jsx'
import useFilename from '../../hook/filename.jsx'

import {
    Button,
    Icon,
    Item,
    Separator
} from '../common.jsx'

import {
    memo,
    useCallback
} from 'react'

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

const Left = styled.div`
    display: flex;
    justify-content: flex-start;
`

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Status = memo((props) => {
    const filename = useFilename(props.filename)
    const percent = usePercent(props.zoom.value)

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
                        <Icon width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </Icon>
                    </Button>
                </Item>
                <Item>
                    <Button disabled={ props.navigation.number + 1 >= props.navigation.total } onClick={ onNextHandle } role="button">
                        <Icon width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </Icon>
                    </Button>
                </Item>
                <Separator />
                <Item>
                    <Button onClick={ onResetHandle } role="button" title="Reset zoom">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </Button>
                </Item>
                <Item>
                    <Button onClick={ onZoomOutHandle } role="button" title="Zoom out">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                        </svg>
                    </Button>
                </Item>
                <Item>
                    <Range { ...props.zoom }
                        onChange={ props.onZoomHandle } />
                </Item>
                <Item>
                    <Button onClick={ onZoomInHandle } role="button" title="Zoom in">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
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