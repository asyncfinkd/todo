import React, { useState, useRef } from 'react';
import TextField from "./components/TextField";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

interface TextNode {
  text: string
}

const App: React.FC = () => {
  const [value, setValue] = useState<TextNode>({ text: "Write Something..." });
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = () => {
    if (!input) {
      inputRef.current?.focus();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a something...",
      });
    } else {
      data.push({
        text: input,
        id: data.length + 1
      });
    }
  }

  return (
    <>
      <div className="container flex:direction">
        <h2>ToDo Application</h2>
        <TextField text={value.text} input={input} handleChange={e => setInput(e.target.value)} refValue={inputRef} />
        <button type="button" className="btn btn-primary" style={{ width: "300px" }} onClick={addItem}>Add to List</button>
        {data.map((item?: any) => {
          return (
            <>
              <div key={item.id}>
                <p>{item.text}</p>
              </div>
            </>
          )
        })}
      </div>
    </>
  );
}

export default App;
