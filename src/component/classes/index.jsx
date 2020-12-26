import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    Button,
    Empty,
    Message
} from '../common.jsx'

import Text from '../text/index.jsx'
import Search from '../search/index.jsx'
import Plus from '../icon/plus/index.jsx'

import {
    memo,
    lazy,
    useMemo,
    Suspense,
    Fragment
} from 'react'

const Virtual = lazy(() => (
    import('../virtual/index.jsx')
))

const Color = lazy(() => (
    import('../color/index.jsx')
))

const Header = styled.div`
    background-color: transparent;
    box-sizing: border-box;
    height: 90px;
    padding: 8px;
    width: 100%;
`

const Body = styled.div`
    display: flex;
    height: calc(100% - 90px);
    width: 100%;
`

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
`

const Picker = styled.div`
    border-radius: 4px;
    cursor: pointer;
    height: 38px;
    margin-right: 8px;
    width: 48px;
`

const Wrapper = styled(Button)`
    margin-top: 8px;
    width: 100%;
`

const Classes = memo((props) => {

    const isEmptyDataSource = useMemo(() => (
        props.dataSource.length === 0
    ), [ props.dataSource ])

    return (
        <Fragment>
            <Header>
                <Search />
                <Wrapper>
                    <Plus width="20" height="20" />
                    <div>Add class</div>
                </Wrapper>
            </Header>
            <Body>
                {
                    isEmptyDataSource ? <Message>
                        <div>Your class list is empty</div>
                    </Message> : <Suspense fallback={ <Empty /> }>
                        <Virtual size={{ width: 300, height: 50 }}>
                            {
                                props.dataSource.map((value) => (
                                    <Row key={ value.id }>
                                        <Picker style={{ background: value.color }}>
                                            <Color />
                                        </Picker>
                                        <Text placeholder="Enter class name" value={ value.name } />
                                    </Row>
                                ))
                            }
                        </Virtual>
                    </Suspense>
                }
            </Body>
        </Fragment>
    )
})

Classes.displayName = 'Classes'

Classes.propTypes = {
    /** Data set for class list */
    dataSource: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string
    }))
}

Classes.defaultProps = {
    dataSource: []
}

export default Classes