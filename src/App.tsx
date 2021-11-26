import React, { useState } from 'react';
import Hero from './components/hero/hero';
import { ApplicationContext } from './context/app/ApplicationContext';

export default function App() {
  const [todo, setTodo] = useState<any>([]);

  return (
    <>
      <ApplicationContext.Provider value={{ todo, setTodo }}>
        <Hero />
      </ApplicationContext.Provider>
    </>
  );
}
