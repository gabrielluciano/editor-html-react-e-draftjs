import {
  FaLink,
  FaUnlink
}
from 'react-icons/fa';

import './Button.css'

function LinkButton({ type, onClick }) {
  let icon;
  if (type === 'addLink') icon = (
    <>
      <FaLink size={16} />
      <div className="tooltip">Add link</div>
    </>
  );
  if (type === 'removeLink') icon = (
    <>
      <FaUnlink size={16} />
      <div className="tooltip">Remove link</div>
    </>
  );

  return (
    <span onClick={onClick} className="button">
      {icon}
    </span>
  );
}

export default LinkButton;