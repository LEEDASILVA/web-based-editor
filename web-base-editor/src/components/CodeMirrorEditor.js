import React, { useEffect, useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import { Controlled } from 'react-codemirror2'

const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

const Tab = ({ active, ...props }) => {
  const commonStyle = {
    'font-size': '20px',
    padding: '10px 60px',
    cursor: 'pointer',
    opacity: '0.6',
    background: 'white',
    border: '0',
    outline: '0',
  }
  const isActiveStyle = active && {
    'border-bottom': '2px solid black',
    opacity: 1,
  }
  return (
    <button style={{ ...commonStyle, ...isActiveStyle }} {...props}>
      {props.key}
    </button>
  )
}

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(tabs[0])

  return (
    <>
      <div style={{ display: 'flex' }}>
        {tabs.map(tab => (
          <Tab key={tab} active={active} onClick={() => setActive(tab)} />
        ))}
      </div>
      <Children />
    </>
  )
}

const CodeMirrorEditor = ({ displayName, value, onChange, options }) => {
  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <div className="editor-container">
      <div className="editor-title">{displayName}</div>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={options}
      />
    </div>
  )
}

const fileTypes = {
  go: { language: 'go' },
  sh: { language: 'sh' },
  css: { language: 'css' },
  html: { language: 'html' },
  rs: { language: 'rust' },
  py: { language: 'python' },
  js: { language: 'javascript' },
}

// expectedFiles -> contains the array of file names
// language -> DOM, javascript, go, rust, python ....
const Editor = ({ fileList, options = {} }) => {
  const [files, setFiles] = useStorage(
    'files',
    !fileList ? { 'index.js': '// code here' } : fileList,
  )

  const { lineWrapping, lint, lineNumbers, theme, enablePreview } = options
  return (
    <>
      {Object.entries(files).map(([name, content]) => {
        const type = name.substring(name.lastIndexOf('.') + 1, name.length)
        const file = fileTypes[type]
        return (
          <CodeMirrorEditor
            key={name}
            displayName={name}
            value={content}
            onChange={value => setFiles({ ...files, [name]: value })}
            options={{
              lineWrapping: lineWrapping || true,
              lint: lint || true,
              lineNumbers: lineNumbers || true,
              theme: theme || 'material',
              mode: file.language,
            }}
          />
        )
      })}
    </>
  )
}

export { CodeMirrorEditor, Editor, useStorage }
