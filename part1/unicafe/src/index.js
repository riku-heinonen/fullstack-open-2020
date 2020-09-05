import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td><td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  const average = (good - bad) / total

  const positivePercentage = good / total * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <Statistic name="good" value={good}></Statistic>
        <Statistic name="neutral" value={neutral}></Statistic>
        <Statistic name="bad" value={bad}></Statistic>
        <Statistic name="all" value={total}></Statistic>
        <Statistic name="average" value={average}></Statistic>
        <Statistic name="positive" value={`${positivePercentage} %`}></Statistic>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)