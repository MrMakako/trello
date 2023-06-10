import { useState, React } from "react";

function Popup(props) {
  const [text, setText] = useState("New Card");

  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <button className="btn_close" onClick={() => props.setTrigger(false)}>
            x
          </button>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <h3 onDoubleClick={handleDoubleClick}>{text}</h3>
          )}
          <h3>Description</h3>
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Popup;
