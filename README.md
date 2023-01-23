# web-based-editor

docker :

> docker build -t c-editor:latest . \
> docker run --name c-editor -d -p 3000:3000 c-editor:latest

no docker :

> npm i --force
> npm start

example :

![example](example.PNG "example")

---

Component `Editor` :

```js
      <Editor
        fileList={{
          'index.js': '',
          'index.css': '',
          'index.html': '',
        }}
        options={{ enablePreview: true }}
      />
```

- `fileList` : should be the list of files we are going to open on the code editor, and its relative content (the content could be and empty string if no content is needed)

- `options` :

  - code mirror options :
    - `lint`
    - `lineNumbers`
    - `theme`

  - `enablePreview`: enable preview of the rendered code

storage is done on the local storage of the browser.

to render the preview you must click on the preview button ! this is for performance reason. But it is possible to add a self render with timeout.

ex:

```js
  useEffect(() => {
    const timeout = setTimeout(()=> {
      setSrcDoc(`
    <html>
      <body>${files['index.html']}</body>
      <style>${files['index.css']}</style>
      <scrypt>${files['index.js']}</scrypt>
    </html>
    `), 1000
    })
  return () => clearTimeout(timeout)
  }, [files])
```
