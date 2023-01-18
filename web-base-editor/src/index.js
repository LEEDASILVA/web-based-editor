import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '@monaco-editor/react'
import './index.css'
import reportWebVitals from './reportWebVitals.js'

const App = () => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
