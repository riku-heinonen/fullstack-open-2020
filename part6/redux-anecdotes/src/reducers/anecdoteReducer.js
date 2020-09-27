import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    case 'REPLACE':
      return state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote
      )
    default:
      return state
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.replaceOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: 'REPLACE', data: updatedAnecdote })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
