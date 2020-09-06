import React, { useEffect, useState } from 'react';

import AddPersonForm from './components/AddPersonForm';
import Filter from './components/Filter';
import PeopleList from './components/PeopleList';
import personService from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getPeople().then((response) => setPeople(response));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (people.map((person) => person.name).includes(newName)) {
      const replacePerson = window.confirm(
        `${newName} is already added to to the phonebook, replace the old number with a new one?`
      );
      if (replacePerson) {
        const id = people.find((person) => person.name === newName).id;
        personService
          .replacePerson(id, newPerson)
          .then((response) =>
            setPeople(people.map((person) => (person.id === id ? response : person)))
          );
      }
    } else {
      personService.createPerson(newPerson).then((response) => {
        setPeople(people.concat(response));
      });
      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPeople(people.filter((person) => person.id !== id));
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchNameChange = (event) => setSearchName(event.target.value);

  const peopleToShow = searchName
    ? people.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : people;

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
        handleNumberChange={handleNumberChange}
      ></AddPersonForm>
      <h2> Numbers </h2>
      <PeopleList people={peopleToShow} deletePerson={deletePerson}></PeopleList>
    </div>
  );
};

export default App;
