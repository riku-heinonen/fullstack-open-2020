import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ name, value }) => <div>{name} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = () => {
    const total = good + neutral + bad
    return total === 0 ? 0 : (good - bad) / total
  }

  const calculatePositiveRatio = () => {
    const total = good + neutral + bad
    return total === 0 ? 0 : good / total * 100
  }
  return (
    <div>
      <Display name="good" value={good}></Display>
      <Display name="neutral" value={neutral}></Display>
      <Display name="bad" value={bad}></Display>
      <Display name="all" value={good + neutral + bad}></Display>
      <Display name="average" value={calculateAverage()}></Display>
      <Display name="positive" value={`${calculatePositiveRatio()} %`}></Display>
    </div>
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