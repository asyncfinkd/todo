import React, { useState, useRef } from "react";
import Input from "../global/Input";

function Form() {
  const [input, setInput] = useState("");
  const InputRef = useRef();
  const [inputError, setInputError] = useState(false);
  const [todo, setTodo] = useState([]);
  const addTodoItem = () => {
    if (!input) {
      setInputError(true);
      InputRef.current.focus();
    } else {
      setInputError(false);
      setTodo([...todo, input]);
      setInput("");
    }
  };
  const ErrorStyle = {
    color: "red",
    marginTop: "15px",
    userSelect: "none",
    fontSize: "15px",
    textTransform: "capitalize",
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="el-center form:direction-sm flex-direction">
          <Input
            type="text"
            placeholder=" "
            className="input form-ai-control"
            label="Todo Item"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            Ref={InputRef}
          />
          {inputError && <p style={ErrorStyle}>Please enter a input</p>}
          <button
            className={
              inputError ? "button btn-purple" : "button btn-purple mt-3"
            }
            onClick={() => addTodoItem()}
          >
            Add Todo
          </button>
          {todo.map((item) => {
            return (
              <>
                <div
                  className="mt-3 badge badge-secondary el-pointer"
                  style={{
                    maxWidth: "100%",
                    padding: "15px",
                  }}
                >
                  <p style={{ marginBottom: "0", fontSize: "15px" }}>{item}</p>
                </div>
              </>
            );
          })}
        </div>
      </form>
    </>
  );
}

export default Form;
