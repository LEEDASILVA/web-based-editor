import { Editor } from './CodeMirrorEditor.js'

import React from 'react'

const App = () => {
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
      <Editor
        fileList={{
          'index.js': '',
          'index.css': '',
          'index.html': '',
        }}
        options={{ enablePreview: true }}
      />
    </>
  )
}

export { App }
