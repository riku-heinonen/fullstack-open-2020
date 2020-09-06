import React from 'react';

const Filter = ({ string, handleChange }) => (
  <div>
    Find countries
    <input value={string} onChange={handleChange} />
  </div>
);

export default Filter;
