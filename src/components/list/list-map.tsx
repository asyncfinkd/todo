import React, { useEffect, useState } from 'react';

export default function ListMap({ container, todo, id, setItem }: any) {
  const [update, setUpdate] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>('');
  const [newVal, setNewVal] = useState<boolean>(false);

  const deleteHandle = (id: any) => {
    const updateList = container.filter((item: any) => item.id !== id);

    setItem(updateList);
  };

  return (
    <>
      <p onClick={() => deleteHandle(id)}>{newVal ? newValue : todo}</p>
      <button
        onClick={() => {
          setUpdate(!update);
        }}
      >
        {update ? 'close' : 'edit'}
      </button>
      {update && (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button
            onClick={() => {
              todo = newValue;

              setNewVal(!newVal);
              setUpdate(!update);
            }}
          >
            Done
          </button>
        </>
      )}
    </>
  );
}
