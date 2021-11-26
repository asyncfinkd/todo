import React from 'react';

export default function ListMap({ todo, id }: any) {
  return (
    <>
      <p
        onClick={() => {
          console.log(id);
        }}
      >
        {todo}
      </p>
    </>
  );
}
