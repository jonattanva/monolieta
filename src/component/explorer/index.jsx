import PropTypes from 'prop-types'
import styled from 'styled-components'

import useScroll from '../../hook/scroll.jsx'

import {
    memo,
    useMemo,
    useCallback
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
    height: ${({ size }) => size.totalHeight}px;
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
    justify-content: flex-start;
    margin: 0 auto;
    padding: 0;
    width: calc(100% - ${({ size }) => size.offsetX}px);
    will-change: transform;
`

const Box = styled.div`
    cursor: default;
    display: flex;
    flex-direction: column;
    margin: ${({ size }) => size.margin}px;
    width: ${({ size }) => size.width}px;
`

const Picture = styled.div`
    cursor: pointer;
    display: flex;
    height: ${({ size }) => size.height}px;
    user-select: none;
    width: ${({ size }) => size.width}px;

    ${({ selected }) => selected && `
        background-color: #6200ee;
    `}
`

const Cover = styled.img`
    height: ${({ selected }) => !selected ? '100%' : '98%'};
    object-fit: cover;
    padding: ${({ selected }) => !selected ? '0' : '1%'};
    width: ${({ selected }) => !selected ? '100%' : '98%'};
`

const Label = styled.div`
    color: hsl(219, 13%, 66%);
    cursor: default;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    line-height: 20px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`

const Explorer = memo((props) => {
    const [ scrollRef, scrollPosition ] = useScroll()

    const width = useMemo(() => {
        return props.image.width + (props.image.margin * 2)
    }, [ props.image ])

    const height = useMemo(() => {
        return props.image.height + (props.image.margin * 2) + 20
    }, [ props.image ])

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

        const total = props.dataSource.length
        let rows = total / columns
        if (rows % 1 !== 0) {
            rows = Math.trunc(rows + 1)
        }

        return rows
    }, [ columns, props.dataSource.length ])

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

    const onSelect = useCallback((event) => {
        if (props.onSelect) {
            const index = Number(event.currentTarget.dataset.key)
            if (props.selected !== index) {
                const item = props.dataSource[index]
                props.onSelect(index, item)
            }
        }
    }, [ props ])

    const visibleChildren = useMemo(() => (
        new Array(visibleNodeCount)
            .fill(null)
            .map((_, index) => {
                const key = index + startNode
                const item = props.dataSource[key]
                return (
                    item && <Box key={ key } size={ props.image }>
                        <Picture size={ props.image } data-key={ key } onClick={ onSelect } selected={ props.selected === key }>
                            <Cover loading="lazy"
                                src={ item.image }
                                selected={ props.selected === key } />
                        </Picture>
                        <Label>{ item.filename }</Label>
                    </Box>
                )
            })
    ), [ visibleNodeCount, startNode, props.image, props.dataSource, props.selected, onSelect ])

    return (
        <Root ref={ scrollRef }>
            <Viewport size={{ totalHeight }}>
                <Body size={{ offsetX }} style={{ transform: `translateY(${offsetY || 0}px)` }}>
                    { visibleChildren }
                </Body>
            </Viewport>
        </Root>
    )
})

Explorer.displayName = 'Explorer'

Explorer.propTypes = {
    /** Data set for image list */
    dataSource: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string,
        image: PropTypes.string
    })),

    /** Selected item */
    selected: PropTypes.number,

    /** Report the value select */
    onSelect: PropTypes.func,

    /** Image size */
    image: PropTypes.shape({
        height: PropTypes.number,
        margin: PropTypes.number,
        width: PropTypes.number
    })
}

Explorer.defaultProps = {
    dataSource: [],
    onSelect: null,
    selected: null,
    image: {
        height: 120,
        margin: 4,
        width: 120
    }
}

export default Explorer