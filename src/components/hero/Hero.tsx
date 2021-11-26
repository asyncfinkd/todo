import React, { useContext, useState } from 'react';
import { ApplicationContext } from '../../context/app/ApplicationContext';
import List from '../list/list';

export default function Hero() {
  const [input, setInput] = useState<string>('');

  const { todo, setTodo } = useContext(ApplicationContext);

  const addItem = () => {
    if (!input) {
      alert('Please enter a todo item');
    } else {
      setTodo([...todo, { todo: input, id: todo.length + 1 }]);

      setInput('');
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="container">
          <h1>Todo</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => addItem()}>Add to list</button>
          <List />
        </div>
      </form>
    </>
  );
}
