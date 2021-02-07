// @flow
import * as React from 'react'
import styled from 'styled-components'
import useScroll from 'component/virtual/hook/scroll.jsx'

const Root = styled.div`
    align-items: stretch;
    background: transparent;
    display: flex;
    height: 100%;
    margin: 0;
    position: relative;
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

type PropsType = {
    children: React.ChildrenArray<any>,
    height: number,
    margin: number,
    width: number
}

const Virtual = (props: PropsType): React.Node => {
    const scrollRef = React.useRef()
    const scrollPosition = useScroll(scrollRef)

    const total = React.useMemo(() => {
        return props.children.length
    }, [props.children.length])

    const width = React.useMemo(() => {
        return props.width + props.margin * 2
    }, [props.width, props.margin])

    const height = React.useMemo(() => {
        return props.height + props.margin * 2
    }, [props.height, props.margin])

    const columns = React.useMemo(() => {
        if (!scrollPosition) {
            return 0
        }
        return Math.trunc(scrollPosition.size.width / width)
    }, [width, scrollPosition])

    const rows = React.useMemo(() => {
        if (columns === 0) {
            return 0
        }

        let rows = total / columns
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1)
        }

        return rows
    }, [columns, total])

    const totalHeight = React.useMemo(() => {
        return rows * height
    }, [rows, height])

    const totalWidth = React.useMemo(() => {
        return columns * width
    }, [columns, width])

    const offsetX = React.useMemo(() => {
        return scrollRef.current
            ? scrollRef.current.offsetWidth - totalWidth
            : 0
    }, [scrollRef, totalWidth])

    const scrollTop = scrollPosition ? scrollPosition.scrollTop : 0
    let startNode = Math.floor(scrollTop / height)
    startNode = Math.max(0, startNode)

    const scrollHeight = scrollPosition ? scrollPosition.size.height : 0
    let visibleNodeCount = Math.ceil(scrollHeight / height) + 2
    visibleNodeCount = Math.min(rows - startNode, visibleNodeCount) * columns

    const offsetY = startNode * height
    startNode = startNode * columns

    const visibleChildren = React.useMemo(() => {
        return props.children.slice(startNode, startNode + visibleNodeCount)
    }, [props.children, startNode, visibleNodeCount])

    return (
        <Root ref={scrollRef}>
            <Viewport style={{ height: totalHeight }}>
                <Body
                    size={{ offsetX }}
                    style={{ transform: `translateY(${offsetY || 0}px)` }}>
                    {visibleChildren}
                </Body>
            </Viewport>
        </Root>
    )
}

Virtual.displayName = 'Virtual'

Virtual.defaultProps = {
    children: [],
    height: 120,
    margin: 0,
    width: 120
}

export default (React.memo<PropsType>(Virtual): React.AbstractComponent<
    PropsType,
    mixed
>)
