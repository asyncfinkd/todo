import React, { useState } from "react";
import List from "../list/List";

export default function Hero() {
  const [input, setInput] = useState<string>("");

  return (
    <>
      <div className="container">
        <h1>Todo</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <List />
      </div>
    </>
  );
}
