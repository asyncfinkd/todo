import React from "react";

function Input(props) {
  return (
    <>
      <div className="form-ai mt-3">
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={props.className}
          value={props.value}
          onChange={props.onChange}
          ref={props.Ref}
        />
        <label>{props.label}</label>
      </div>
    </>
  );
}

export default Input;
