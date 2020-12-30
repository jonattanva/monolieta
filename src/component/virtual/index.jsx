import PropTypes from 'prop-types'
import styled from 'styled-components'

import useScroll from '../../hook/scroll.jsx'

import {
    memo,
    useRef,
    useMemo
} from 'react'

const Root = styled.div`
    align-items: stretch;
    background: transparent;
    display: flex;
    height: 100%;
    margin: 0;
    overflow: auto;
    transform: translateZ(0);
    width: 100%;
    will-change: scroll-position;
`

const Viewport = styled.div`
    min-height: 100%;
    overflow: hidden;
    position: absolute;
    transform: translateZ(0);
    width: 100%;
    will-change: transform;
`

const Body = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    contain: content;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    justify-content: flex-start;
    margin: 0 auto;
    padding: 0;
    width: calc(100% - ${({ size }) => size.offsetX}px);
    will-change: transform;
`

const Virtual = memo((props) => {
    const scrollRef = useRef()
    const scrollPosition = useScroll(scrollRef)

    const width = useMemo(() => {
        return props.size.width + (props.margin * 2)
    }, [ props.size, props.margin ])

    const height = useMemo(() => {
        return props.size.height + (props.margin * 2)
    }, [ props.size, props.margin ])

    const columns = useMemo(() => {
        if (!scrollPosition) {
            return 0
        }
        return Math.trunc(scrollPosition.size.width / width)
    }, [ width, scrollPosition ])

    const rows = useMemo(() => {
        if (columns === 0) {
            return 0
        }

        const total = props.children.length
        let rows = total / columns
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1)
        }

        return rows
    }, [ columns, props.children.length ])

    const totalHeight = useMemo(() => {
        return rows * height
    }, [ rows, height ])

    const totalWidth = useMemo(() => {
        return columns * width
    }, [ columns, width ])

    const offsetX = useMemo(() => {
        return scrollRef.current ? scrollRef.current.offsetWidth - totalWidth : 0
    }, [ scrollRef, totalWidth ])

    const scrollTop = scrollPosition ? scrollPosition.scrollTop : 0
    let startNode = Math.floor(scrollTop / height)
    startNode = Math.max(0, startNode)

    const scrollHeight = scrollPosition ? scrollPosition.size.height : 0
    let visibleNodeCount = Math.ceil(scrollHeight / height) + 2
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns

    const offsetY = startNode * height
    startNode = startNode * columns

    const visibleChildren = useMemo(() => (
        props.children.slice(startNode, startNode + visibleNodeCount)
    ), [ props.children, startNode, visibleNodeCount ])

    if (props.onResize && scrollPosition) {
        props.onResize(scrollPosition.size)
    }

    return (
        <Root ref={ scrollRef }>
            <Viewport style={{ height: totalHeight }}>
                <Body size={{ offsetX }} style={{ transform: `translateY(${offsetY || 0}px)` }}>
                    { visibleChildren }
                </Body>
            </Viewport>
        </Root>
    )
})

Virtual.displayName = 'Virtual'

Virtual.propTypes = {
    /** Component content */
    children: PropTypes.node,

    /** Item margin */
    margin: PropTypes.number,

    /** Item size */
    size: PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number
    }).isRequired,

    /** It is called every time the container is resized */
    onResize: PropTypes.func
}

Virtual.defaultProps = {
    margin: 0,
    onResize: null
}

export default Virtual