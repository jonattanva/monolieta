import styled from 'styled-components'

import {
    memo
} from 'react'

import Cube from '../icon/cube/index.jsx'
import Hand from '../icon/hand/index.jsx'
import Cursor from '../icon/cursor/index.jsx'
import Setting from '../icon/setting/index.jsx'

import {
    Button,
    Item,
    Separator
} from '../common.jsx'

const Root = styled.div`
    align-items: center;
    background-color: hsl(220, 13%, 15%);
    background-color: var(--color-primary-dark, hsl(220, 13%, 15%));
    box-sizing: border-box;
    color: hsl(219, 13%, 66%);
    color: var(--color-font-variant, hsl(219, 13%, 66%));
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

const Action = memo(() => (
    <Root>
        <Left>
            <Item>
                <Button>
                    <Cursor width="20" height="20" />
                </Button>
            </Item>
            <Item>
                <Button>
                    <Hand width="20" height="20" />
                </Button>
            </Item>
            <Separator />
            <Item>
                <Button>
                    <Cube width="20" height="20" />
                </Button>
            </Item>
        </Left>
        <Right>
            <Item>
                <Button>
                    <Setting width="20" height="20" />
                </Button>
            </Item>
        </Right>
    </Root>
))

Action.displayName = 'Action'

export default Action