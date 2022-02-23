# Editor HTML com React e DraftJS

Esta é minha implementação da biblioteca de edição de textos [DraftJS](https://draftjs.org/). Trata-se de um editor de textos no formato WYSIWYG (What You See Is What You Get - O que você vê é o que você recebe.) para a geração de conteúdo em HTML. O editor fornece uma função simples para converter seu conteúdo em HTML, que pode ser copiado e utilizado onde quiser.

*Read this in English: [English](README.en.md).*

## Sobre o DraftJS e este projeto

O DraftJS é uma biblioteca Open Source criada pelo Facebook utilizando [ReactJS](https://pt-br.reactjs.org/) que permite criar editores de textos customizáveis. Entretanto, para utilizar e customizar o Editor adicionando mais tags ou funcionalidades, uma série de configurações precisam ser feitas. Este projeto foi criado inicialmente a partir de uma necessidade do site [Aritmetika.com.br](https://www.aritmetika.com.br) e contém algumas dessas configurações básicas.

## Tecnologias
- ReactJS
- DraftJS

## Utilização

Primeiro clone o repositório na sua máquina. Então, você pode instalar as dependências e iniciar o editor usando [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/).

```bash
git clone https://github.com/gabrielluciano/editor-html-react-e-draftjs
cd editor-html-react-e-draftjs
npm install
npm start
```
Ou
```bash
git clone https://github.com/gabrielluciano/editor-html-react-e-draftjs
cd editor-html-react-e-draftjs
yarn
yarn start
```

Agora você pode testar o editor em [localhost:3000](http://localhost:3000).

## Adicionando o componente do Editor ao seu projeto em React

O componente está localizado no caminho: `./src/components/Editor`. Apenas copie a pasta do Editor para o seu projeto. Você deve ainda instalar as seguintes dependências para que o editor funcione corretamente:
* [DraftJS](https://draftjs.org/)
* [Immutable](https://immutable-js.github.io/immutable-js/)
* [React Icons](https://react-icons.github.io/react-icons/)

Para instalar as dependências necessárias use:
```bash
npm install draft-js immutable react-icons
```
Ou
```bash
yarn add draft-js immutable react-icons
```

### Importando o componente
Para utilizar o componente Editor, você precisa dos seguintes imports:
```javascript
import { EditorState } from 'draft-js';
import Editor from './components/Editor/Editor';
import decorator from './components/Editor/decorators/index';
```
### Usando o componente Editor
Para usar o editor é necessário criar um React State e então passar tanto a variável de estado quanto a função para mudança de estado como propriedades do componente Editor. Veja o exemplo abaixo, que utiliza o hook useState para criar o estado "editorState".

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
Observe que você precisa passar o seguinte argumento para a função useState: `() => EditorState.createEmpty(decorator)`. Isso vai criar um novo editor vazio com as informações do decorator passado como parâmetro para a função createEmpty.

## Convertendo para HTML
O conteúdo do editor pode ser convertido para uma string HTML a partir da função `convertToHtml` que recebe como parâmetro o estado do editor. Veja abaixo como utilizar:

```javascript
import Editor, { convertToHtml } from './components/Editor/Editor';
// ...
// ...
const html = convertToHtml(editorState);
```

## License
MIT