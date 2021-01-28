// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import Editor from './view/workspace/editor/index.jsx'

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #6200ee;
        --color-primary-variant: #9951ff;
        --color-primary-highlight: rgba(98, 0, 238, 0.16);
        --color-primary-panel: hsl(220, 13%, 15%);
        --color-primary-panel-variant: hsl(220, 13%, 25%);
        --color-font: hsl(0, 0%, 90%);
        --color-font-variant: hsl(220, 13%, 66%);
        --color-font-disabled: hsl(220, 13%, 50%);
        --color-secondary: #15ff0d;
        --color-secondary-panel: hsl(220, 13%, 20%);
        --color-alert: #e60013
    }
`

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
        <Editor />
    </React.Fragment>,
    document.getElementById('main')
)
