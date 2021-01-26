import './RawContentBlock.css';

function RawContentBlock({ children }) {
  return (
    <div className="raw_container">
      <span className="raw_description">Raw</span>
      {children}
    </div>
  );
}

export default RawContentBlock;