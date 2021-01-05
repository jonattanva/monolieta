import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import Rect from './view/component/rect/index.jsx'

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #6200ee;
        --color-primary-variant: #9951ff;
        --color-primary-highlight: rgba(98, 0, 238, 0.16);
        --color-font: hsla(0,0%, 100%, .90);
        --color-font-variant: hsl(219, 13%, 66%);
        --color-primary-dark: hsl(220, 13%, 15%);
        --color-primary-dark-variant: hsl(220, 13%, 25%);
        --color-highlight: hsl(220, 13%, 20%);
    }
`

const dataSource = [
    {
        key: '1',
        x: 100,
        y: 100,
        width: 300,
        height: 300,
        color: '#6200ee'
    }
]

ReactDOM.render(
    <Fragment>
        <GlobalStyle />
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
            <Rect dataSource={ dataSource } />
        </svg>
    </Fragment>,
    document.getElementById('main')
)
