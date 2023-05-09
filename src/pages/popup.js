import React from "react";
import "./popup_style.css";

function Popup(props) {
  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <button className="btn_close" onClick={() => props.setTrigger(false)}>
            x
          </button>
          <h2>New Card</h2>
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
