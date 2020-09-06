import React from 'react';

const Person = ({ person, deletePerson }) => {
  const deleteById = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id);
    }
  };
  return (
    <p>
      {person.name} {person.number} <button onClick={deleteById}>Delete</button>
    </p>
  );
};

const PeopleList = ({ people, deletePerson }) => (
  <div>
    <div>
      {people.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson}></Person>
      ))}{' '}
    </div>
  </div>
);

export default PeopleList;
