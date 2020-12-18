import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../button/index.jsx'
import Canvas from '../canvas/index.jsx'
import Status from '../status/index.jsx'

import {
    memo,
    useMemo,
    useState,
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

const Sidebar = styled.div`
    align-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color:  hsl(220, 13%, 23%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`

const Reverse = styled(Sidebar)`
    flex-direction: row-reverse;
`

const Panel = styled.div`
    align-content: flex-end;
    align-items: center;
    align-self: stretch;
    background-color:  hsl(220, 13%, 23%);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    min-width: 300px;
    width: 300px;
`

const Control = styled.div`
    align-content: flex-start;
    align-items: center;
    align-self: stretch;
    background-color: hsl(220, 13%, 15%);
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    justify-content: flex-start;
    min-width: 24px;
    user-select: none;
    width: 24px;
`

const Item = styled.div`
    align-content: center;
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 24px;
    justify-content: center;
    margin-bottom: 56px;
    transition: 0.3s;
    width: 80px;

    &:hover {
        background-color: hsl(220, 13%, 5%);
    }
`

const Icon = styled.svg`
    height: 16px;
    margin-right: 6px;
    width: 16px;
`

const Left = styled(Item)`
    transform-origin: 55px 25px;
    transform: rotate(-90deg) translateY(-2px);

    ${Icon} {
        transform: rotate(90deg);
    }
`

const Right = styled(Item)`
    transform-origin: 25px 25px;
    transform: rotate(90deg) translateY(-2px);
    ${Icon} {
        transform: rotate(-90deg);
    }
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

const Message = styled.div`
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    text-align: center;
    width: 100%;
`

const Separator = styled.div`
    margin: 8px 0;
`

const Editor = memo((props) => {
    const [ isLabel, setLabel ] = useState(false)
    const [ isProject, setProject ] = useState(true)

    const onSelectedLabel = useCallback(() => {
        setLabel(value => !value)
    }, [ setLabel ])

    const onSelectedProject = useCallback(() => {
        setProject(value => !value)
    }, [ setProject ])

    const isEmptyDataSource = useMemo(() => (
        props.dataSource.length === 0
    ), [ props.dataSource ])

    return (
        <Root>
            <Container>
                <Sidebar>
                    <Control>
                        <Left onClick={ onSelectedProject } role="button">
                            <Icon viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </Icon>
                            <div>Project</div>
                        </Left>
                    </Control>
                    {
                        isProject && <Panel>
                            {
                                isEmptyDataSource && <Message>
                                    <Separator>You have not yet opened a folder.</Separator>
                                    <Button onClick={ props.onOpenFolder }>Open folder</Button>
                                </Message>
                            }
                        </Panel>
                    }
                </Sidebar>
                <Body>
                    <Canvas />
                </Body>
                <Reverse>
                    <Control>
                        <Right role="button">
                            <Icon viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                            </Icon>
                            <div>Objects</div>
                        </Right>
                        <Right onClick={ onSelectedLabel } role="button">
                            <Icon viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </Icon>
                            <div>Label</div>
                        </Right>
                    </Control>
                    {
                        isLabel && <Panel>

                        </Panel>
                    }
                </Reverse>
            </Container>
            <Status />
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