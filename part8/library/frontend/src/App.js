import { ALL_AUTHORS, ALL_BOOKS, GET_ME } from './queries'
import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)
  const [getMe, meResult] = useLazyQuery(GET_ME)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      getMe()
    }
  }, [getMe, token])

  useEffect(() => {
    if (meResult.data?.me) {
      setFavoriteGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data])

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      {page === 'authors' && (
        <Authors authors={authorsResult.data?.allAuthors} setErrorMessage={notify} />
      )}

      {page === 'books' && <Books allBooks={booksResult.data?.allBooks} />}

      {token && page === 'add' && <NewBook setErrorMessage={notify} token={token} />}

      {token && page === 'recommendations' && <Recommendations favoriteGenre={favoriteGenre} />}

      {page === 'login' && (
        <LoginForm setErrorMessage={notify} setToken={setToken} setPage={setPage} />
      )}
    </div>
  )
}

export default App
