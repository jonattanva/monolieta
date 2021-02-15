// @flow
import ReactDOM from 'react-dom'
import Session from 'component/session'
import Editor from 'view/editor'

ReactDOM.render(
    <Session>
        <Editor />
    </Session>,
    document.getElementById('main')
)
