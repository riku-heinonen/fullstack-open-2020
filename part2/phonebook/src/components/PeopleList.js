import React from 'react'

const Person = ({ person }) => (
  <p> {person.name} {person.number} </p>
)

const PeopleList = ({ people }) => (
  <div>
    <div>
      {people.map(person => <Person key={person.name} person={person} ></Person>)}
    </div>
  </div>
)

export default PeopleList