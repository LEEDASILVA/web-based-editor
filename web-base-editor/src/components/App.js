import { Editor } from './CodeMirrorEditor.js'

import React from 'react'

const App = () => {
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
