import React from 'react';

export default function ListMap({ container, todo, id, setItem }: any) {
  const deleteHandle = (id: any) => {
    const updateList = container.filter((item: any) => item.id !== id);

    setItem(updateList);
  };
  return (
    <>
      <p onClick={() => deleteHandle(id)}>{todo}</p>
    </>
  );
}
