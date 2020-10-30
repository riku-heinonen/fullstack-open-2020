import { CREATE_USER, LOGIN } from '../queries'
import React, { useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'

const LoginForm = ({ setErrorMessage, setToken, setPage }) => {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const [login, loginResult] = useMutation(LOGIN, {
    onError: error => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  const [createUser] = useMutation(CREATE_USER, {
    onError: error => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [loginResult.data, setPage, setToken])

  const submitLogin = event => {
    event.preventDefault()
    login({ variables: { username: loginUsername, password: loginPassword } })
    setLoginUsername('')
    setLoginPassword('')
  }

  const submitCreateUser = event => {
    event.preventDefault()
    createUser({ variables: { username: newUsername, favoriteGenre: favoriteGenre } })
    setNewUsername('')
    setFavoriteGenre('')
  }

  return (
    <div>
      <div>
        <h2> Login </h2>
        <form onSubmit={submitLogin}>
          <div>
            username
            <input
              value={loginUsername}
              onChange={({ target }) => setLoginUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={loginPassword}
              onChange={({ target }) => setLoginPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
      <div>
        <h2> Create User </h2>
        <form onSubmit={submitCreateUser}>
          <div>
            username
            <input value={newUsername} onChange={({ target }) => setNewUsername(target.value)} />
          </div>
          <div>
            favorite genre
            <input
              value={favoriteGenre}
              onChange={({ target }) => setFavoriteGenre(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
