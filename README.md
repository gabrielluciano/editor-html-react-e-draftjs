# Text Editor implemented using DraftJS

This is my personal implementation of [DraftJS](https://draftjs.org/), a framework for create Rich Text Editor for React. Feel free to use or modify these project.

## Basic Usage

First clone the repository into your machine. Then you can install the dependencies using [yarn](https://yarnpkg.com/).

```bash
git clone https://github.com/gabrielluciano/draftjs-implementation
cd draftjs-implementation
yarn
yarn start
```
Now you can test the editor on [localhost](http://localhost:3000).

## Adding the component to your React project

The component is located on path: `./src/components/Editor`. Just copy the Editor folder to your project. The component need the following dependencies to work properly:
* [DraftJS](https://draftjs.org/)
* [Immutable](https://immutable-js.github.io/immutable-js/)
* [React Icons](https://react-icons.github.io/react-icons/)

You can add this dependecies to your project running following command on your project root folder:
```bash
yarn add draft-js immutable react-icons
```
### Importing the component
You will need the following imports do use the editor:
```javascript
import { EditorState } from 'draft-js';
import Editor from './components/Editor/Editor';
import decorator from './components/Editor/decorators/index';
```
### Using the Editor component
To use the editor you will need to create a React State then pass the state variable and set state function to Editor component like the bellow example, that uses a functional React component with useState Hook:
```javascript
import { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from './components/Editor/Editor';
import decorator from './components/Editor/decorators/index';

function App() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(decorator)
  );

  return (
    <Editor
      editorState={editorState}
      setEditorState={setEditorState}
    />
  );
}

export default App;
```
Note that you need to pass the following argument to useState function `() => EditorState.createEmpty(decorator)`. This will create empty editor state with the custom decorator passed on createEmpty.

## Converting to html
This component also provides a function called `convertToHtml` that takes the editorState as a parameter and return an HTML string that contains the converted editor state to html.
```javascript
import Editor, { convertToHtml } from './components/Editor/Editor';
// ...
// ...
const html = convertToHtml(editorState);
```

## License
MIT