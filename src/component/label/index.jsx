import styled from 'styled-components'

import Text from '../text/index.jsx'
import Color from '../color/index.jsx'
import Search from '../search/index.jsx'

import { memo } from 'react'

const Item = styled.div`
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: row;
    height: 50px;
    justify-content: flex-start;
    padding: 8px;
`

const Picker = styled.div`
    border-radius: 4px;
    cursor: pointer;
    height: 36px;
    width: 42px;
`

const Label = memo(() => {
    return (
        <div>
            <div>Label</div>
            <div>
                <Search />
                <div>
                    <Item>
                        <Picker>
                            <Color />
                        </Picker>
                        <Text />
                    </Item>
                </div>
            </div>
        </div>
    )
})

Label.displayName = 'Label'

export default Label