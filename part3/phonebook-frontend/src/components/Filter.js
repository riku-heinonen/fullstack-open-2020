import React from 'react'

const Filter = ({ string, handleChange }) => (
  <div>
    Filter by name
    <input
      value={string}
      onChange={handleChange}
    />
  </div>
)

export default Filter