import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        password{' '}
        <input
          id='password'
          type='text'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
