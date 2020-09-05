import React from 'react'

const Header = ({ course }) => (
  <h2>{course}</h2>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}></Part>)}
  </div>
)

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  return (
    <p><b>Number of exercises {exercises.reduce((a, b) => a + b, 0)}</b></p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course