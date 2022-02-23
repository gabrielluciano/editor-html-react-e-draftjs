function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { linkData } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a 
      href={linkData.url} 
      target={linkData.target}
    >
      {props.children}
    </a>
  );
}

const link = {
  strategy: findLinkEntities,
  component: Link,
};

export default link;