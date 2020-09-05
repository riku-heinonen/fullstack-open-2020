import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({ anecdote: anecdotes[0], votes: 0 })

  const randomNumber = () => Math.floor(Math.random() * anecdotes.length)

  const addVote = () => {
    const copy = [...votes]
    copy[selected]++
    if (copy[selected] > mostVoted.votes) {
      setMostVoted({ anecdote: anecdotes[selected], votes: copy[selected] })
    }
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}></Anecdote>
      <Button handleClick={addVote} text="vote"></Button>
      <Button handleClick={() => setSelected(randomNumber())} text="next anecdote"></Button>
      <Anecdote anecdote={mostVoted.anecdote} votes={mostVoted.votes}></Anecdote>
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)