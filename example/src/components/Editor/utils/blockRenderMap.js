import { Map } from 'immutable';

import RawContentBlock from '../components/RawContentBlock'

const blockRenderMap = Map({
  'raw': {
    element: 'div',
    wrapper: <RawContentBlock />
  }
});

export default blockRenderMap;