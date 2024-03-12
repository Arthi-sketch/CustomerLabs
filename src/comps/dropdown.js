import React, { useState } from "react";
import Select from "react-select";
import Button from "./button/button";

export default function Dropdown(props) {
  function selected(e) {
    props.handleSelect(e.label, e.value);
  }
  
  return (
    <div style={{ width: "95%", marginTop: "4%" }}>
      <Select
        placeholder={
          <span style={{ color: "#000", fontWeight: "600" }}>
            {props.placeholder}
          </span>
        }
        id={props.idValue}
        onChange={selected}
        options={props.options}
      />
    </div>
  );
}
