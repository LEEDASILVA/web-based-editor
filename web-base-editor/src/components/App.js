import { Editor, useStorage } from './CodeMirrorEditor.js'

import React, { useState } from 'react'

const App = () => {
  // const [html, setHtml] = useStorage('html', '')
  // const [css, setCss] = useStorage('css', '')
  // const [js, setJs] = useStorage('js', '')
  // const [srcDoc, setSrcDoc] = useState('')

  // using useEffect to render the iframe only some times and not always !! (performance reason)
  // using setTimeout ???
  // useEffect(() => {
  //   setSrcDoc(`
  //   <html>
  //     <body>${html}</body>
  //     <style>${css}</style>
  //     <scrypt>${html}</scrypt>
  //   </html>
  //   `)
  // return () => clearTimeout(timeout)
  // }, [html, css, js])

  return (
    <>
      <div className="panel top-panel">
        {/* <CodeMirrorEditor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <CodeMirrorEditor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
        <CodeMirrorEditor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        /> */}
        <Editor
          fileList={{
            'index.js': '',
            'index.css': '',
            'index.html': '',
          }}
        />
      </div>
      {/* <div style={{ background: '#3c3e44' }} className="editor-title">
        <button
          onClick={() => {
            setSrcDoc(`
            <html>
              <body>${html}</body>
              <style>${css}</style>
              <scrypt>${js}</scrypt>
            </html>
            `)
          }}
        >
          Render output
        </button>
      </div> */}
      {/* <div className="panel">
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div> */}
      <div className="panel">
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          srcDoc={''}
        />
      </div>
    </>
  )
}

export { App }
