import React, { useState } from "react";

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
      </div>
    </>
  );
}
