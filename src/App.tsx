import React, { useState } from 'react';
import TextField from "./components/TextField";

interface TextNode {
  text: string
}

const App: React.FC = () => {
  const [value, setValue] = useState<TextNode>({ text: "Write Something..." });
  const [input, setInput] = useState<string>("");

  return (
    <>
      <div className="container flex:direction">
        <h2>ToDo Application</h2>
        <TextField text={value.text} input={input} handleChange={e => setInput(e.target.value)} />
      </div>
    </>
  );
}

export default App;
