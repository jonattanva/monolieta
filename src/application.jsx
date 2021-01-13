// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

import Rect from './view/component/rect/index.jsx' // TODO: REMOVE LINE!

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

const Mock = (): React.Node => {
    const [value, setValue] = React.useState({
        x: 100,
        y: 100,
        width: 100,
        height: 100
    })

    const onResize = (x, y, width, height) => {
        setValue({
            x,
            y,
            width,
            height
        })
    }

    const onDrag = (x, y) => {
        setValue((current) => ({
            ...current,
            x: current.x + x,
            y: current.y + y
        }))
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
            <Rect {...value} onResize={onResize} onDrag={onDrag} />
        </svg>
    )
}

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle />
        <Mock />
    </React.Fragment>,
    document.getElementById('main')
)
// <Rect x={ 400 } y={ 100 } width={ -100 } height={ 100 } />
