import './LinkInput.css';

import { BsX } from 'react-icons/bs'

function LinkInput({ url, target, onUrlChange, onTargetChange, confirmLink, setShowLinkDataPrompt }) {
  return (
    <div className="link-input_container">
      <div className="link-input_box">
        <span
          className="link-input_close-button"
          onClick={() => setShowLinkDataPrompt(false)}
        >
          <BsX />
        </span>
        <div className="link-input_inputs-outer-conatiner">
          <div className="link-input_input-container">
            <label className="link-input_label" htmlFor="url">URL</label>
            <input
              id="url"
              className="link-input_input"
              type="text"
              placeholder="url"
              value={url}
              onChange={onUrlChange}
            />
          </div>
          <div className="link-input_input-container">
            <label className="link-input_label" htmlFor="target">Target</label>
            <select
              className="link-input_input"
              id="target"
              value={target}
              onChange={onTargetChange}
            >
              <option value="_blank">_blank</option>
              <option value="_self">_self</option>
              <option value="_parent">_parent</option>
              <option value="_top">_top</option>
            </select>
          </div>
        </div>
        <span
          className="link-input_confirm"
          onClick={confirmLink}
        >
          confirm
        </span>
      </div>
    </div>
  );
}

export default LinkInput;