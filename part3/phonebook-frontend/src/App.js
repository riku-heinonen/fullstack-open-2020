import React, { useEffect, useState } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PeopleList from './components/PeopleList'
import personService from './services/person'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState({ message: null, type: null })

  useEffect(() => {
    personService.getPeople().then((response) => setPeople(response))
  }, [])

  const setSuccessNotification = (message) => {
    setNotification({ message, type: 'success' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  const setErrorNotification = (message) => {
    setNotification({ message, type: 'error' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (people.map((person) => person.name).includes(newName)) {
      const replacePerson = window.confirm(
        `${newName} is already added to to the phonebook, replace the old number with a new one?`
      )
      if (replacePerson) {
        const id = people.find((person) => person.name === newName).id
        personService
          .replacePerson(id, newPerson)
          .then((response) => {
            setPeople(people.map((person) => (person.id === id ? response : person)))
            setSuccessNotification(`Changed number of ${newName}`)
          })
          .catch((error) => {
            setErrorNotification(`${newName} has already been removed from server`)
            personService.getPeople().then((response) => setPeople(response))
          })
      }
    } else {
      personService
        .createPerson(newPerson)
        .then((response) => {
          console.log(response)
          setPeople(people.concat(response))
          setSuccessNotification(`Added ${newName}`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          setErrorNotification(error.response.data.error)
        })
    }
  }

  const deletePerson = (id) => {
    const name = people.find((person) => person.id === id).name
    personService
      .deletePerson(id)
      .then((response) => {
        console.log(response)
        setPeople(people.filter((person) => person.id !== id))
        setSuccessNotification(`Deleted ${name}`)
      })
      .catch((error) => {
        setErrorNotification(`${name} has already been removed from server`)
        personService.getPeople().then((response) => setPeople(response))
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchNameChange = (event) => setSearchName(event.target.value)

  const peopleToShow = searchName
    ? people.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : people

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Phonebook</h2>
      <Filter string={searchName} handleChange={handleSearchNameChange} />
      <h2>Add a new contact</h2>
      <AddPersonForm
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2> Numbers </h2>
      <PeopleList people={peopleToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
