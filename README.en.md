# HTML Editor with ReactJS and DraftJS

This is my personal implementation of [DraftJS](https://draftjs.org/). It's a WYSIWYG (What You See Is What You Get) text editor for generating html content. The editor provides a simple function for converting its content to HTML, that can be copied and used anywhere.

*Leia em português: [Português Brasileiro](README.md).*

## Application Preview
You can see and test the application in [this link](https://editor-html-react-e-draftjs.vercel.app/)!

## About DraftJS and this project

DraftJS is an Open Source library created by Facebook using [ReactJS](https://reactjs.org/) that allows to create customizable text editors. However, to use and customize the Editor adding more tags or functionalities, a number of settings need to be made. This project was initially created from a need of the website [Aritmetika.com.br](https://www.aritmetika.com.br) and contains some of these basic settings.

## Technologies
- ReactJS
- DraftJS

## Utilization

First clone the repository into your machine. Then you can install the dependencies using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).
```bash
git clone https://github.com/gabrielluciano/editor-html-react-e-draftjs
cd editor-html-react-e-draftjs
npm install
npm start
```
Or
```bash
git clone https://github.com/gabrielluciano/editor-html-react-e-draftjs
cd editor-html-react-e-draftjs
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
npm install draft-js immutable react-icons
```
Or, with yarn:
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
To use the editor you will need to create a React State then pass the state variable and set state function to the Editor component like the bellow example, that uses a functional React component with useState Hook:
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
The editor content can be converted to an HTML string using the function `convertToHtml`, that takes the editorState as a parameter. See how to use it in the example below:

```javascript
import Editor, { convertToHtml } from './components/Editor/Editor';
// ...
// ...
const html = convertToHtml(editorState);
```

## License
MIT