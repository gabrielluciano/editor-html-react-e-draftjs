import { convertToRaw } from 'draft-js';

function convertToHtml(editorState) {
  const rawEditorState = convertToRaw(editorState.getCurrentContent());

  let convertedHtml = '';
  let lastBlockType = '';

  const { blocks, entityMap } = rawEditorState;

  blocks.forEach(block => {

    if (block.type !== 'unordered-list-item' && lastBlockType === 'unordered-list-item') {
      convertedHtml += '</ul>';
    }
    if (block.type !== 'ordered-list-item' && lastBlockType === 'ordered-list-item') {
      convertedHtml += '</ol>';
    }

    let tag = '';
    switch (block.type) {
      case 'unstyled':
        tag = 'p';
        break;
      case 'header-one':
        tag = 'h1';
        break;
      case 'header-two':
        tag = 'h2';
        break;
      case 'header-three':
        tag = 'h3';
        break;
      case 'header-four':
        tag = 'h4';
        break;
      case 'header-five':
        tag = 'h5';
        break;
      case 'header-six':
        tag = 'h6';
        break;
      case 'blockquote':
        tag = 'blockquote';
        break;
      case 'code-block':
        tag = 'pre';
        break;
      case 'unordered-list-item':
        if (lastBlockType !== 'unordered-list-item') convertedHtml += '<ul>'
        tag = 'li';
        break;
      case 'ordered-list-item':
        if (lastBlockType !== 'ordered-list-item') convertedHtml += '<ol>'
        tag = 'li';
        break;
      default:
        tag = 'p';
    }

    if (block.type === 'raw') {
      convertedHtml += block.text;
    } else {
      convertedHtml += renderInlineTags(block, tag, entityMap);
    }

    lastBlockType = block.type;
  
  });

  return convertedHtml;
}

function renderInlineTags(block, outerTag, entityMap) {
  let renderedBlockText = block.text;

  const opentag = '<' + outerTag + '>';
  const closetag = '</' + outerTag + '>';

  const { inlineStyleRanges } = block;
  const { entityRanges } = block;
  
  const inlineStyleLength = inlineStyleRanges.length;
  const entityRangesLenght = entityRanges.length;

  if (renderedBlockText.length === 0) {
    return '';
  }

  if (inlineStyleLength === 0 && entityRangesLenght === 0) {
    return opentag + renderedBlockText + closetag;
  }

  let htmlOpenTagLength = null;
  let htmlCloseTagLength = null;

  let lastStart = null;
  let lastEnd = null;

  let stylesArray = inlineStyleRanges.map(inlineStyle => {
    return {
      start: inlineStyle.offset, 
      end: inlineStyle.offset + inlineStyle.length,
      style: inlineStyle.style,
    }
  });

  if (entityRangesLenght !== 0) {
    stylesArray = stylesArray.concat(entityRanges.map((entityRange, index) => {
      const { offset, length, key } = entityRange;
      const { data, type } = entityMap[key];

      return {
        start: offset,
        end: offset + length,
        style: type,
        linkData: data.linkData
      }
    }));
  }

  const stylesArrayLength = stylesArray.length;

  stylesArray.forEach((inlineStyle, index, array) => {
    // We need to modify start and end values for each style lefting
    // because we added html tags to renderedBlockText

    if (index !== 0) {
      for (let i = index; i < stylesArrayLength; i++) {
        const currentStart = array[i].start;
        const currentEnd = array[i].end;

        // RULES
        
        if (currentStart < lastStart) {
          if (currentEnd < lastStart) {
            // do nothing
          } else if (currentEnd === lastStart) {
            // do nothing
          } else if ((lastStart < currentEnd) && (currentEnd < lastEnd)) {
            array[i].end += htmlOpenTagLength;
          } else if (currentEnd === lastEnd) {
            array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
          } else { // currentEnd > lastEnd
            array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
          }
          
        } else if (currentStart === lastStart) {
          if ((lastStart < currentEnd) && (currentEnd < lastEnd)) {
            array[i].start += htmlOpenTagLength;
            array[i].end += htmlOpenTagLength;
          } else if (currentEnd === lastEnd) {
            array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
          } else { // currentEnd > lastEnd
            array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
          }

        } else if ((lastStart < currentStart) && (currentStart < lastEnd)) {
          if ((lastStart < currentEnd) && (currentEnd < lastEnd)) {
            array[i].start += htmlOpenTagLength;
            array[i].end += htmlOpenTagLength;
          } else if (currentEnd === lastEnd) {
            array[i].start += htmlOpenTagLength;
            array[i].end += htmlOpenTagLength;
          } else { // currentEnd > lastEnd
            array[i].start += htmlOpenTagLength;
            array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
          }

        } else if (currentStart === lastEnd) {
          array[i].start += (htmlOpenTagLength + htmlCloseTagLength);
          array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
        } else { // currentStart > lastEnd
          array[i].start += (htmlOpenTagLength + htmlCloseTagLength);
          array[i].end += (htmlOpenTagLength + htmlCloseTagLength);
        }

      }
    }

    const { start, end, style } = inlineStyle;

    const beforeInlineStyle = renderedBlockText.substring(0, start);
    let betweenInlineStyle = renderedBlockText.substring(start, end);
    const afterInlineStyle = renderedBlockText.substring(end);

    if (betweenInlineStyle !== ' ') { 
      let htmlTag = '';
      switch (style) {
        case 'BOLD':
          htmlTag = 'strong';
          break;
        case 'ITALIC':
          htmlTag = 'em';
          break;
        case 'UNDERLINE':
          htmlTag = 'u';
          break;
        case 'STRIKETHROUGH':
          htmlTag = 'span';
          break;
        case 'LINK':
          htmlTag = 'a';
          break;
        default:
          htmlTag = null;
      }
  
      let htmlOpenTag = '';
      let htmlCloseTag = '';
  
      if (htmlTag) {
        style === 'STRIKETHROUGH'
          ? htmlOpenTag = '<' + htmlTag + ' style="text-decoration: line-through;">'
          : htmlOpenTag = '<' + htmlTag + '>';
  
        if (htmlTag === 'a') {
          htmlOpenTag = `<a href="${inlineStyle.linkData.url}" target="${inlineStyle.linkData.target}"`;
          if (inlineStyle.linkData.url.match(/(\.|ools|https|http)/g) !== null) {
            htmlOpenTag += ' rel="noopener noreferrer"';
          }
          htmlOpenTag += '>';
        }
  
        htmlCloseTag = '</' + htmlTag + '>';
      }
      
      htmlOpenTagLength = htmlOpenTag.length;
      htmlCloseTagLength = htmlCloseTag.length;
  
      lastStart = start;
      lastEnd = end;
  
      renderedBlockText = 
        beforeInlineStyle +  
        htmlOpenTag + betweenInlineStyle + htmlCloseTag +
        afterInlineStyle;
    }

  });
  
  return opentag + renderedBlockText + closetag;
}

export default convertToHtml;