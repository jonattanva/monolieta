import PropTypes from 'prop-types'
import styled from 'styled-components'

import Status from '../status/index.jsx'

import {
    memo,
    lazy,
    useMemo,
    useState,
    Suspense,
    useCallback
} from 'react'

const Root = styled.div`
    align-content: flex-start;
    align-items: center;
    background-color: hsl(220, 13%, 18%);
    color: hsl(0, 0%, 90%);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    height: 100vh;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100vw;
`

const Container = styled.div`
    align-content: center;
    align-items: center;
    align-self: stretch;
    background-color: hsl(220, 13%, 18%);
    color: hsl(0, 0%, 90%);
    cursor: default;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
`

const Body = styled.div`
    align-content: center;
    align-items: center;
    align-self: stretch;
    background-color: hsl(220, 13%, 18%);
    color: hsl(0, 0%, 90%);
    cursor: default;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: center;
    min-width: 0;
    width: 100%;
`

const Sidebar = styled.div`
    align-content: center;
    align-items: center;
    align-self: stretch;
    background-color:  hsl(220, 13%, 23%);
    display: flex;
    flex-wrap: nowrap;
    min-width: 300px;
    width: 300px;
`

const Empty = styled.div`
    display: none;
`

const Message = styled.div`
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    text-align: center;
    width: 100%;
`

const Separator = styled.div`
    margin: 8px 0;
`

const Button = lazy(() => (
    import('../button/index.jsx')
))

const Explorer = lazy(() => (
    import('../explorer/index.jsx')
))

const Canvas = lazy(() => (
    import('../canvas/index.jsx')
))

const Editor = memo((props) => {
    const [ image, setImage ] = useState()
    const [ zoom, setZoom ] = useState({
        max: 4, min: 1, step: 0.1, value: 1
    })

    const isEmptyDataSource = useMemo(() => (
        props.dataSource.length === 0
    ), [ props.dataSource ])

    const onZoomHandle = useCallback((value) => {
        setZoom(self => ({
            ...self, value
        }))
    }, [ setZoom ])

    const onSelect = useCallback((index) => {
        setImage(index)
    }, [ setImage ])

    const visibleChildren = useMemo(() => {
        if (isEmptyDataSource) {
            return (
                <Message>
                    <Separator>You have not yet opened a folder.</Separator>
                    <Button onClick={ props.onOpenFolder }>Open folder</Button>
                </Message>
            )
        }

        return (
            <Explorer selected={ image }
                onSelect={ onSelect }
                dataSource={ props.dataSource } />
        )

    }, [ isEmptyDataSource, image, onSelect, props.onOpenFolder, props.dataSource ])

	return (
        <Root>
            <Container>
                <Sidebar>
                    <Suspense fallback={ <Empty /> }>
                        { visibleChildren }
                    </Suspense>
                </Sidebar>
                <Body>
                    <Suspense fallback={ <Empty /> }>
                        <Canvas zoom={ zoom } />
                    </Suspense>
                </Body>
                <Sidebar></Sidebar>
            </Container>
            <Status zoom={ zoom }
                onZoomHandle={ onZoomHandle } />
        </Root>
	)
})

Editor.displayName = 'Editor'

Editor.propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string,
        image: PropTypes.string
    })),
    onOpenFolder: PropTypes.func
}

Editor.defaultProps = {
    dataSource: [],
    onOpenFolder: null
}

export default Editor