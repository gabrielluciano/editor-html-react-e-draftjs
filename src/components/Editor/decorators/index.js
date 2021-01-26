import { CompositeDecorator } from 'draft-js';

import LinkDecorator from './link';

const decorator = new CompositeDecorator([
  LinkDecorator,
]);

export default decorator;