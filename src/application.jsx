// @flow
import ReactDOM from 'react-dom'
import Editor from 'workspace/editor'
import Session from 'component/session'

ReactDOM.render(
    <Session>
        <Editor />
    </Session>,
    document.getElementById('main')
)
