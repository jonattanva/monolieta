// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

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
        --color-secondary: #15ff0d;
    }
`

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
    </React.Fragment>,
    document.getElementById('main')
)
