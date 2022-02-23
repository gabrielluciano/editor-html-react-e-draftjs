import { EditorState } from 'draft-js';
import Editor, { convertToHtml } from './components/Editor/Editor';
import decorator from './components/Editor/decorators/index';
import { useState } from 'react';

import './App.css'

function App() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(decorator)
  )
  const [renderHTML, setRenderHTML] = useState(false);

  const html = convertToHtml(editorState);

  function Button(props) {
    return (
      <button 
        onClick={() => setRenderHTML(!renderHTML)}
        className="button"
      >
        {props.children}
      </button>
    )
  }

  function HtmlDiv() {
    return (
      <>
        {renderHTML ? (
          <div className="htmlDiv" dangerouslySetInnerHTML={{__html: html}}></div>
          ) : (
          <div className="htmlDiv">{html}</div>
        )}
      </>
    )
  }

  return (
    <div className="App">
      <Editor 
        editorState={editorState}
        setEditorState={setEditorState}
        className="editor"
      />
      <div className="result">
          <div className="header">
            <Button>
              {renderHTML ? 'View HTML' : 'View Rendered HTML'}
            </Button>
          </div>
          <HtmlDiv />
      </div>
    </div>
  );
}

export default App;
