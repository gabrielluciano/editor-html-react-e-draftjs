import { useState } from 'react';
import { EditorState } from 'draft-js';

import Editor, { convertToHtml } from './components/Editor/Editor';
import decorator from './components/Editor/decorators/index';

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

  return (
    <div>
      <Editor
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </div>
  );
}

export default App;