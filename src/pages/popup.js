import React from "react";
import "./popup_style.css";

function Popup(props) {
  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <button className="btn_close">Close</button>
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Popup;
