function blockStyles(contentBlock) {
  const type = contentBlock.getType();

  switch (type) {
    case 'blockquote':
      return 'editor_blockquote';
    case 'raw':
      return;
    case 'ordered-list-item':
    case 'unordered-list-item':
      return 'editor_list-item';
    default:
      return 'editor_default';
  }

}

export default blockStyles;