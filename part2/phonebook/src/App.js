import React, { useState } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import PeopleList from './components/PeopleList'

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (people.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to to the phonebook`)
    } else {
      setPeople(people.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchNameChange = (event) => setSearchName(event.target.value)

  const peopleToShow = searchName ?
    people.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) :
    people

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter string={searchName} handleChange={handleSearchNameChange}></Filter>
      <h2>Add a new contact</h2>
      <AddPersonForm
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}>
      </AddPersonForm>
      <h2> Numbers </h2>
      <PeopleList people={peopleToShow}></PeopleList>
    </div>
  )
}

export default App