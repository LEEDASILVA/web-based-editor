import './index.css'
import { App } from './components/App.js'

import React from 'react'
import ReactDOM from 'react-dom'

// try monaco vs codemirror
// we can also use sandpack (this uses codemirror)
// dependencies for the monaco editor
// TODO : add monaco editor as a tab to also test it out !
// - "@codesandbox/sandpack-react": "^1.20.4",
// - "@monaco-editor/loader": "^1.3.2",
// - "@monaco-editor/react": "^4.4.6",

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
