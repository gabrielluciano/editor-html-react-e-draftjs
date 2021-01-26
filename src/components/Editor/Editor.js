import { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';
import convertToHtml from './ConvertToHtml';
import 'draft-js/dist/Draft.css';

import blockRenderMap from './utils/blockRenderMap';
import customBlockStyles from './utils/blockStyles'
import INLINE_STYLES from './utils/inlineStyles';
import BLOCK_TYPES from './utils/blockTypes';

import StyleButton from './components/StyleButton';
import LinkButton from './components/LinkButton';
import LinkInput from './components/LinkInput';

import './Editor.css';

function CustomEditor({ editorState, setEditorState }) {
  const defaultLinkData = { url: '', target: '_blank' };

  const editor = useRef(null);

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
  const [showLinkDataPrompt, setShowLinkDataPrompt] = useState(false);
  const [linkData, setLinkData] = useState(defaultLinkData);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  function toggleInlineStyles(e, inlineStyle) {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    setTimeout(() => editor.current.focus(), 0);
  }

  function toggleBlockTypes(e, blockType) {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    setTimeout(() => editor.current.focus(), 0);
  }

  function promptForLink(e) {
    e.preventDefault();
    const selection = editorState.getSelection();

    // collapsed = without selection (anchor and range are the same)
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffSet = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffSet);

      let newLinkData = { ...defaultLinkData };
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        if (linkInstance.getType() === 'LINK') {
          newLinkData = linkInstance.getData().linkData;
        }
      }

      setShowLinkDataPrompt(true);
      setLinkData(newLinkData);
    }
  }

  function confirmLink(e) {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'SEGMENTED',
      { linkData }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ));
    setShowLinkDataPrompt(false);
    setLinkData(defaultLinkData);
    setTimeout(() => editor.current.focus(), 1);
  }

  function removeLink(e) {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  }

  const onUrlChange = (e) => setLinkData({
    ...linkData,
    url: e.target.value
  });

  const onTargetChange = (e) => setLinkData({
    ...linkData,
    target: e.target.value
  });

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="button-container">
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockTypes}
          />
        </div>
        <div className="button-container">
          <InlineStylesControls
            editorState={editorState}
            onToggle={toggleInlineStyles}
          />
          <LinkButton type="addLink" onClick={promptForLink} />
          <LinkButton type="removeLink" onClick={removeLink}/>
        </div>
      </div>
      {showLinkDataPrompt && (
        <LinkInput
          url={linkData.url}
          onUrlChange={onUrlChange}
          onTargetChange={onTargetChange}
          confirmLink={confirmLink}
          setShowLinkDataPrompt={setShowLinkDataPrompt}
          
        />
      )}
      <Editor
        editorState={editorState}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={customBlockStyles}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        stripPastedStyles={true}
        ref={editor}
      />
    </div>
  );
}

const BlockStyleControls = (props) => {
  const selection = props.editorState.getSelection();
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return BLOCK_TYPES.map(type => (
    <StyleButton
      key={type.label}
      label={type.label}
      active={type.style === blockType}
      onClick={(e) => props.onToggle(e, type.style)}
    >
      {type.icon === null ? (
         <span>{type.label}</span>
      ) : (
        type.icon
      )}
    </StyleButton>
  ));
}

const InlineStylesControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return INLINE_STYLES.map(type => (
    <StyleButton
      key={type.label}
      label={type.label}
      active={currentStyle.has(type.style)}
      onClick={(e) => props.onToggle(e, type.style)}
    >
      {type.icon === null ? (
        type.label
      ) : (
        type.icon
      )}
    </StyleButton>
  ));
}

export default CustomEditor;
export {
  convertToHtml,
};