import React, { useState } from "react";
import Label from "./Label";

function TextArea(props) {
  const [borderColor, setBorderColor] = useState(false);
  return (
    <div className="w-100">
      <Label>Message</Label>

      <textarea
        onChange={props.onChange}
        value={props.value}
        onFocus={() => setBorderColor(true)}
        onBlur={() => setBorderColor(false)}
        style={{
          border: borderColor ? "1px solid  #00A652" : "1px solid #292D3233",
          borderRadius: "10px",
          maxWidth: "819px",
          width: "100%",
          minHeight: "218px",
          padding: "10px",
          outline: "none",
          transition: "0.25s",
          fontSize: "16px",
          resize: "none",
        }}
      ></textarea>
    </div>
  );
}

export default TextArea;
