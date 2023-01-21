import React, { useEffect, useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/lesser-dark.css'
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

const Tab = ({ active, ...props }) => (
    <div className="editor-title" key={props.key} {...props}>
      <p style={active ? { opacity: 1 } : { opacity: 0.6 }}>{props.tab}</p>
    </div>
  )

const Tabs = ({ active, setActive, tabs }) => (
    <>
      <div
        style={{ marginBottom: '1px', background: '#262626', display: 'flex' }}
      >
        {tabs.map(tab => (
          <Tab
            tab={tab}
            key={tab}
            active={active === tab}
            onClick={() => setActive(tab)}
          />
        ))}
      </div>
    </>
  )

const CodeMirrorEditor = ({ value, onChange, options }) => {
  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <div className="editor-container">
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
  html: { language: 'xml' },
  rs: { language: 'rust' },
  py: { language: 'python' },
  js: { language: 'javascript' },
}

const Editor = ({ fileList, options = {} }) => {
  const [active, setActive] = useState(Object.keys(fileList)[0])
  const [srcDoc, setSrcDoc] = useState('')
  const [files, setFiles] = useStorage(
    'files',
    !fileList ? { 'index.js': '// code here' } : fileList,
  )

  const { lineWrapping, lint, lineNumbers, theme, enablePreview } = options
  const type = active.substring(active.lastIndexOf('.') + 1, active.length)

  return (
    <>
      <Tabs
        className="editor-title"
        active={active}
        setActive={setActive}
        tabs={Object.keys(fileList)}
      />
      <div className="panel top-panel">
        <CodeMirrorEditor
          key={active}
          value={files[active]}
          onChange={value => setFiles({ ...files, [active]: value })}
          options={{
            lineWrapping: lineWrapping || true,
            lint: lint || true,
            lineNumbers: lineNumbers || true,
            theme: theme || 'lesser-dark',
            mode: fileTypes[type].language,
          }}
        />
      </div>
      {enablePreview && (
        <>
          <div style={{ background: '#262626' }}>
            <button
              onClick={() => {
                setSrcDoc(`
            <html>
              <body>${files['index.html']}</body>
              <style>${files['index.css']}</style>
              <script>${files['index.js']}</script>
            </html>
            `)
              }}
            >
              <svg width="30px" viewBox="0 0 130 130">
                <g stroke="grey">
                  <path d="M65 29.61c33.13 0 60 35.39 60 35.39s-26.87 35.39-60 35.39S5 65 5 65s26.87-35.39 60-35.39z" fill="none" strokeWidth="8px"></path>
                  <circle stroke="grey" strokeWidth="20px" cx="65" cy="65" r="5"></circle>
                </g>
              </svg>
            </button>
          </div>
          <div className="panel">
            <iframe
              title="output"
              sandbox="allow-scripts"
              width="100%"
              height="100%"
              srcDoc={srcDoc}
            />
          </div>
        </>
      )}
    </>
  )
}

export { CodeMirrorEditor, Editor, useStorage }
