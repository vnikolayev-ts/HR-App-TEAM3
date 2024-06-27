import React from 'react';

const List = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </li>
    ))}
  </ul>
);

export default List;
