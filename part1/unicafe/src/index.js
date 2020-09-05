import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ name, value }) => <div>{name} {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAverage = (good, neutral, bad) => {
    const total = good + neutral + bad
    return total === 0 ? 0 : (good - bad) / total
  }

  const calculatePositiveRatio = (good, total) => {
    return total === 0 ? 0 : good / total * 100
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <h2>Statistics</h2>
      <Display name="good" value={good}></Display>
      <Display name="neutral" value={neutral}></Display>
      <Display name="bad" value={bad}></Display>
      <Display name="all" value={good + neutral + bad}></Display>
      <Display name="average" value={calculateAverage(good, neutral, bad)}></Display>
      <Display name="positive" value={`${calculatePositiveRatio(good, good + neutral + bad)} %`}></Display>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)