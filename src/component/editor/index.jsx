import { memo } from 'react'
import styled from 'styled-components'

const Root = styled.div`
    align-content: flex-start;
    align-items: center;
    background-color: hsl(220, 13%, 18%);
    color: hsl(0, 0%, 90%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100vh;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 100vw;
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
    font-family: Roboto, sans-serif;
    font-size: .875rem;
    height: 100%;
    justify-content: center;
    min-width: 0;
    width: 100%;
`

const Editor = memo(() => {
	return (
        <Root>
            <Body>

            </Body>
        </Root>
	)
})

Editor.displayName = 'Editor'

export default Editor