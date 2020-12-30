import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Editor from './component/editor/index.jsx'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #6200ee;
        --color-primary-variant: #9951ff;
        --color-font: hsla(0,0%, 100%, .90);
        --color-font-variant: hsl(219, 13%, 66%);
        --color-primary-dark: hsl(220, 13%, 15%);
        --color-primary-dark-variant: hsl(220, 13%, 25%);
        --color-highlight: hsl(220, 13%, 20%);
    }
`

ReactDOM.render(
    <Fragment>
        <GlobalStyle />
        <Editor />
    </Fragment>, document.getElementById('main')
)