import './Button.css';

function Button({ onClick, active, children, label }) {
  let className = 'button';
  if (active) className += ' selected_button';

  return (
    <span className={className} onClick={onClick}>
      <span className="button_icon">{children}</span>
      <span className="tooltip">{label}</span>
    </span>
  );
}

export default Button;