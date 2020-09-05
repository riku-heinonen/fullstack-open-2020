import React from 'react'

const AddPersonForm = ({ handleSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        name:
          <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

export default AddPersonForm