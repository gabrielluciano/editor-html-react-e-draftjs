import { BsCodeSlash } from 'react-icons/bs';

import {
  FaQuoteLeft,
  FaParagraph,
  FaListUl,
  FaListOl
}
from 'react-icons/fa';

const blockTypes = [
  {label: 'p', style: 'unstyled', icon: <FaParagraph size={16} />},
  {label: 'H1', style: 'header-one', icon: null},
  {label: 'H2', style: 'header-two', icon: null},
  {label: 'H3', style: 'header-three', icon: null},
  {label: 'H4', style: 'header-four', icon: null},
  {label: 'H5', style: 'header-five', icon: null},
  {label: 'H6', style: 'header-six', icon: null},
  {label: 'Blockquote', style: 'blockquote', icon: <FaQuoteLeft size={16} />},
  {label: 'UL', style: 'unordered-list-item', icon: <FaListUl size={16} />},
  {label: 'OL', style: 'ordered-list-item', icon: <FaListOl size={16} />},
  {label: 'Code Block', style: 'code-block', icon: <BsCodeSlash size={16} />},
  {label: 'Raw', style: 'raw', icon: null}
];

export default blockTypes;