import styled from 'styled-components'

import Title from '../title/index.jsx'
import Search from '../search/index.jsx'

import { memo } from 'react'

const Root = styled.div`
    width: 100%;
`

const Header = styled.div`
    padding: 8px;
`

const Button = styled.div`
    display: flex;
`

const Label = memo(() => {
    return (
        <Root>
            <Title>Label</Title>
            <Header>
                <Button role="button" title="Add label to the project">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </Button>
                <Search />
            </Header>
        </Root>
    )
});

Label.displayName = 'Label'

export default Label