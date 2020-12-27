import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
    Empty,
    Message
} from '../common.jsx'

import {
    memo,
    lazy,
    useMemo,
    Suspense,
    Fragment,
} from 'react'

import Virtual from '../virtual/index.jsx'

import Eye from '../icon/eye/index.jsx'
import Show from '../icon/show/index.jsx'
import Lock from '../icon/lock/index.jsx'
import Label from '../icon/label/index.jsx'

const Select = lazy(() => (
    import('react-select')
))

const Body = styled.div`
    display: flex;
    height: 100%;
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

const Color = styled.div`
    background-image: repeating-linear-gradient(
        -45deg, transparent, transparent 2px, ${({ $color }) => $color} 2px, ${({ $color }) => $color} 4px);
    cursor: default;
    height: 32px;
    min-width: 32px;
    outline: none;
    width: 32px;
`

const Input = styled.div`
    box-sizing: border-box;
    margin: 0 8px;
    width: 100%;
`

const Button = styled.div`
    align-items: center;
    background-color: transparent;
    border-radius: 4px;
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    min-width: 32px;
    outline: none;
    padding: 4px;
    text-align: center;
    width: 32px;

    &:hover {
        background-color: hsla(219, 13%, 66%, .2);
    }
`

const Group = memo((props) => {

    const styles = useMemo(() => ({
        control: (base) => ({
            ...base,
            background: 'hsl(220, 13%, 15%)',
            borderColor: 'hsl(220, 13%, 15%)',
            height: 32,
            minHeight: 32,
            '&:hover': {
                borderColor: 'hsl(220, 13%, 15%)'
            }
        }),
        indicatorSeparator: (base) => ({
            ...base,
            background: 'transparent'
        }),
        indicatorsContainer: (base) => ({
            ...base,
            height: '100%'
        }),
        menu: (base) => ({
            ...base,
            background: 'hsl(220, 13%, 15%)'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: 'hsla(0,0%, 100%, .90)',
            '&:hover': {
                color: 'hsl(219, 13%, 66%)'
            }
        }),
    }), [])

    const isEmptyDataSource = useMemo(() => (
        props.dataSource.length === 0
    ), [ props.dataSource ])

    return (
        <Fragment>
            <Body>
                {
                    isEmptyDataSource ? <Message>
                        <div>To add an annotation instance, draw an object</div>
                    </Message> : <Suspense fallback={<Empty />}>
                        <Virtual size={{ width: 300, height: 50 }}>
                            {
                                props.dataSource.map((value) => (
                                    <Row key={ value.id }>
                                        <Color $color={ value.color } />
                                        <Input>
                                            <Select styles={ styles } />
                                        </Input>
                                        <Button>
                                            <Eye width="20" height="20" />
                                        </Button>
                                        <Button>
                                            <Label width="20" height="20" />
                                        </Button>
                                        <Button>
                                            <Lock width="20" height="20" />
                                        </Button>
                                        <Button>
                                            <Show width="20" height="20" />
                                        </Button>
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

Group.displayName = 'Group'

Group.propTypes = {
    /** Data set for object list */
    dataSource: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        color: PropTypes.string
    }))
}

Group.defaultProps = {
    dataSource: []
}

export default Group