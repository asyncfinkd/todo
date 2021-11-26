import React, { useContext } from 'react';
import { ApplicationContext } from '../../context/app/ApplicationContext';
import ListMap from './list-map';

export default function List() {
  const { todo, setTodo } = useContext(ApplicationContext);

  return (
    <>
      {todo?.map((item: any) => {
        return <ListMap todo={item.todo} id={item.id} />;
      })}
    </>
  );
}
