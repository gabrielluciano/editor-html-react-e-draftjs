import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
}
from 'react-icons/bs';

// import { GrMonospace } from 'react-icons/gr';

const inlineStyles = [
  {label: 'Bold', style: 'BOLD', icon: <BsTypeBold size={20}/>},
  {label: 'Italic', style: 'ITALIC', icon: <BsTypeItalic size={20} />},
  {label: 'Underline', style: 'UNDERLINE', icon: <BsTypeUnderline size={20} />},
  // {label: 'Monospace', style: 'CODE', icon: <GrMonospace size={20} />},
  {label: 'Strikethrough', style: 'STRIKETHROUGH', icon: <BsTypeStrikethrough size={20} />}
]

export default inlineStyles;